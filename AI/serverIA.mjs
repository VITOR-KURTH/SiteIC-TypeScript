// serverIA.mjs
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { exec } from 'child_process';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Configurar __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json()); // Para receber JSON no body

// Configuração do Multer para uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pasta uploads/
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`); // Exemplo: video-1714165800000.mp4
  },
});

const upload = multer({ storage });

// Rota para fazer upload do vídeo
app.post('/upload-video', upload.single('video'), (req, res) => {
  try {
    if (!req.file) {
      console.error('Nenhum arquivo foi enviado.');
      return res.status(400).send('Nenhum arquivo foi enviado.');
    }

    console.log('Vídeo recebido com sucesso:', req.file.filename);

    // Retorna o nome do arquivo para o frontend
    res.status(200).json({ filename: req.file.filename });
  } catch (error) {
    console.error('Erro no upload:', error.message);
    res.status(500).send('Erro no upload do vídeo.');
  }
});

// Rota para processar o vídeo
app.post('/process-video', async (req, res) => {
  try {
    const { filename } = req.body;

    if (!filename) {
      return res.status(400).send('Nome do arquivo não fornecido.');
    }

    const videoPath = path.resolve(__dirname, 'uploads', filename);
    const outputVideoPath = path.resolve(__dirname, 'results', 'output_video.mp4');
    const modelPath = path.resolve(__dirname, 'models', 'model.py');

    console.log('Caminho do vídeo para processar:', videoPath);

    if (!fs.existsSync(videoPath)) {
      return res.status(404).send('Arquivo de vídeo não encontrado.');
    }

    if (!fs.existsSync(modelPath)) {
      return res.status(500).send('Script de processamento não encontrado.');
    }

    const command = `python "${modelPath}" --video "${videoPath}"`;
    console.log('Executando script:', command);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Erro ao executar o script:', stderr || error.message);
        return res.status(500).send('Erro ao processar o vídeo.');
      }

      console.log('Saída do script:', stdout);

      // Aqui vamos extrair a contagem do stdout
      // Esperamos que o seu script Python imprima algo assim no final:
      // CONTAGEM: {"carro": 10, "moto": 5, "onibus": 1}

      const match = stdout.match(/CONTAGEM:\s*(\{.*\})/);
      if (match) {
        const countData = JSON.parse(match[1]);
        return res.status(200).json({ counts: countData });
      } else {
        console.error('Não foi possível extrair a contagem dos veículos.');
        return res.status(500).send('Erro ao extrair a contagem dos veículos.');
      }
    });

  } catch (error) {
    console.error('Erro inesperado no servidor:', error.message);
    res.status(500).send('Erro no servidor.');
  }
});

// Nova rota para baixar o vídeo processado
app.get('/download-video', (req, res) => {
  const outputVideoPath = path.resolve(__dirname, 'results', 'output_video.mp4');

  if (!fs.existsSync(outputVideoPath)) {
    console.error('Vídeo processado não encontrado para download.');
    return res.status(404).send('Vídeo processado não encontrado.');
  }

  res.download(outputVideoPath, 'video_processado.mp4', (err) => {
    if (err) {
      console.error('Erro ao enviar o vídeo processado para download:', err.message);
    }
  });
});


// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
