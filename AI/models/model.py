import argparse
import os
import numpy as np
import cv2
from ultralytics import YOLO
import supervision as sv

# Classe personalizada LineZone
class LineZone:
    def __init__(self, start, end):
        self.start = start
        self.end = end
        self.counter = 0
        self.crossed_ids = set()  # Para rastrear IDs que já cruzaram a linha

    def check_crossing(self, box_center, object_id):
        # Apenas conta o objeto se ele ainda não cruzou a linha antes
        if box_center[1] >= self.start[1] and object_id not in self.crossed_ids:
            print(f"Objeto {object_id} cruzou a linha na posição {box_center}.")
            self.counter += 1
            self.crossed_ids.add(object_id)  # Marcar o ID como tendo cruzado a linha
            return True
        return False

# Função para encontrar automaticamente um vídeo em ./video/
def find_video_in_directory(directory="./video"):
    if not os.path.exists(directory):
        print(f"Diretório '{directory}' não encontrado.")
        return None
    videos = [f for f in os.listdir(directory) if f.endswith(('.mp4', '.avi', '.mov', '.mkv'))]
    if not videos:
        print(f"Nenhum vídeo encontrado no diretório '{directory}'.")
        return None
    return os.path.join(directory, videos[0])

def parse_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Script de detecção e contagem de objetos com YOLOv8")
    parser.add_argument("--video", type=str, help="Caminho para o vídeo de entrada")
    parser.add_argument("--model_path", type=str, default="./best.pt", help="Caminho para o modelo YOLOv8")
    return parser.parse_args()

def main(args):
    # Encontre o vídeo automaticamente se --video não for fornecido
    if not args.video:
        print("Nenhum vídeo especificado. Procurando vídeo automaticamente em './video/video.mp4'...")
        video_path = find_video_in_directory()
        if not video_path:
            print("Erro: Nenhum vídeo foi encontrado.")
            return
        print(f"Vídeo encontrado: {video_path}")
        args.video = video_path

    model = YOLO(args.model_path)
    CLASS_NAMES_DICT = model.names
    model.fuse()

    tracker = sv.ByteTrack()

    # Defina os pontos de início e fim da linha
    START = (0, 200)   # Coordenada y da linha
    END = (600, 200)   # Coordenada y da linha
    line_counter = LineZone(start=START, end=END)

    # Substituição do BoundingBoxAnnotator por BoxAnnotator conforme aviso de depreciação
    box_annotator = sv.BoxAnnotator(thickness=4)
    label_annotator = sv.LabelAnnotator()

    video_info = sv.VideoInfo.from_video_path(args.video)
    frame_generator = sv.get_video_frames_generator(args.video)

    # Configuração para salvar o vídeo na pasta './video/'
    output_video_path = "./video/output_video.mp4"  # Defina o caminho na pasta video
    fourcc = cv2.VideoWriter_fourcc(*"mp4v")  # Codec de vídeo
    output_video = cv2.VideoWriter(output_video_path, fourcc, 30, (video_info.width, video_info.height))

    for frame in frame_generator:
        result = model(frame)[0]
        detections = sv.Detections.from_ultralytics(result)
        detections = tracker.update_with_detections(detections)

        labels = [f"#{tracker_id}" for tracker_id in detections.tracker_id]

        for detection, tracker_id in zip(detections, labels):
            if tracker_id is not None and isinstance(detection[0], np.ndarray):  # Verifique se o objeto tem um ID e coordenadas
                x1, y1, x2, y2 = detection[0]
                
                # Verifique se todas as coordenadas são válidas
                if all(coord is not None for coord in (x1, y1, x2, y2)):
                    box_center = ((x1 + x2) / 2, (y1 + y2) / 2)
                    line_counter.check_crossing(box_center, tracker_id)
            else:
                print("Detecção inválida ou incompleta encontrada:", detection)

        annotated_frame = box_annotator.annotate(scene=frame.copy(), detections=detections)
        annotated_frame = label_annotator.annotate(scene=annotated_frame, detections=detections, labels=labels)

        # Exibir contador no quadro
        cv2.putText(annotated_frame, f"Count: {line_counter.counter}", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        # Salvar o frame anotado no vídeo de saída
        output_video.write(annotated_frame)

    # Libere o vídeo de saída e feche as janelas
    output_video.release()
    print("Contagem final:", line_counter.counter)

if __name__ == "__main__":
    args = parse_arguments()
    main(args)
