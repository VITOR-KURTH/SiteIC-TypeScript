import multer from 'multer';
import { exec } from 'child_process';
import path from 'path';

// Configurar upload
const upload = multer({ dest: 'uploads/' });

// Rota para processar vídeos
server.post('/process-video', upload.single('video'), async (request, reply) => {
    const videoPath = request.file.path; // Caminho do vídeo enviado
    const outputVideoPath = path.resolve('./results/output_video.mp4'); // Caminho do vídeo processado

    // Executar o script da IA
    exec(`python AI/models/model.py --video ${videoPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error('Erro ao executar a IA:', error.message);
            return reply.status(500).send({ error: 'Erro ao processar o vídeo.' });
        }

        console.log(stdout);

        // Retornar o vídeo processado
        reply.sendFile(outputVideoPath, { root: '.' }, (err) => {
            if (err) {
                console.error('Erro ao enviar o vídeo processado:', err.message);
            }
        });
    });
});
