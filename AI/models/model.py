import os
import cv2
from supervision.utils.video import VideoSink
from tqdm import tqdm
from ultralytics import YOLO
import supervision as sv
import json


# Caminhos
HOME = os.getcwd()
uploads_dir = os.path.join(HOME, "uploads")
results_dir = os.path.join(HOME, "results")

def get_latest_video(directory):
    # Lista todos os arquivos no diretório
    files = os.listdir(directory)
    
    # Filtra apenas os arquivos .mp4
    video_files = [f for f in files if f.endswith('.mp4')]
    
    # Ordena os arquivos por data de modificação (mais recente primeiro)
    video_files.sort(key=lambda f: os.path.getmtime(os.path.join(directory, f)), reverse=True)
    
    # Retorna o caminho completo do arquivo mais recente ou None se não houver arquivos
    return os.path.join(directory, video_files[0]) if video_files else None

# Obtém o vídeo mais recente da pasta uploads
video_input = get_latest_video(uploads_dir)
if not video_input:
    raise Exception("Nenhum vídeo encontrado na pasta uploads!")

video_filename = os.path.basename(video_input)
video_output = os.path.join(results_dir, "output_video.mp4")

# Garante que a pasta de resultados exista
os.makedirs(results_dir, exist_ok=True)

if __name__ == "__main__":
    # Carrega o modelo YOLO
    model = YOLO(os.path.join(HOME, "models", "best.pt"))
    model.fuse()

    # Cria um gerador de frames a partir do vídeo
    video_info = sv.VideoInfo.from_video_path(video_input)
    frame_generator = sv.get_video_frames_generator(video_input)

    # Inicializa os anotadores e o rastreador
    bounding_box_annotator = sv.BoxAnnotator(thickness=2)
    label_annotator = sv.LabelAnnotator()
    tracker = sv.ByteTrack()

    # Contagem de veículos
    counted_vehicles = set()
    total_vehicle_count = {
        "caminhaog": 0,
        "caminhaop": 0,
        "carro": 0,
        "moto": 0,
        "onibus": 0,
        "tuktuk": 0,
        "van": 0
    }

    # Processamento do vídeo
    with VideoSink(video_output, video_info) as sink:
        for frame in tqdm(frame_generator, total=video_info.total_frames):
            # Passa o frame pelo modelo YOLO
            results = model(frame)[0]

            if results.boxes is not None:
                detections = sv.Detections.from_ultralytics(results)

                # Aplica o rastreamento
                tracked_detections = tracker.update_with_detections(detections)

                # Evita contagem duplicada de veículos
                for track_id, cls in zip(tracked_detections.tracker_id, tracked_detections.class_id):
                    label = model.names[int(cls)]
                    if label in total_vehicle_count and track_id not in counted_vehicles:
                        total_vehicle_count[label] += 1
                        counted_vehicles.add(track_id)

                # Prepara os rótulos para anotação no frame
                labels = [
                    f"{model.names[int(cls)]} {conf:.2f}"
                    for cls, conf in zip(tracked_detections.class_id, tracked_detections.confidence)
                ]

                # Anota as caixas e rótulos nos frames
                frame = bounding_box_annotator.annotate(frame, tracked_detections)
                frame = label_annotator.annotate(frame, tracked_detections, labels)

            # Escreve o frame anotado no vídeo de saída
            sink.write_frame(frame)

    # Exibe os resultados
    print(f"✅ Processamento concluído! Vídeo salvo em: {video_output}")
    print(f"Contagem Final: {sum(total_vehicle_count.values())}")
    print("Contagem por Tipo de Veículo:")
    for vehicle, count in total_vehicle_count.items():
        print(f"- {vehicle}: {count}")
    print("CONTAGEM:", json.dumps(total_vehicle_count))
