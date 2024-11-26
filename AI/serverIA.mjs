import express from 'express'; // Framework para criar o servidor web
import multer from 'multer'; // Middleware para upload de arquivos
import cors from 'cors'; // Permite requisições de outras origens
import path from 'path'; // Lida com caminhos de arquivos/diretórios
import { exec } from 'child_process'; // Executa comandos externos, como scripts Python
import fs from 'fs'; // Manipula arquivos no sistema
import { fileURLToPath } from 'url'; // Lida com caminhos em módulos ES6

// Configurar __dirname para módulos ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Configurar CORS
app.use(cors());

// Configurar multer para upload de arquivos com extensão
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Pega a extensão do arquivo
    cb(null, `${file.fieldname}-${Date.now()}${ext}`); // Define o nome com extensão
  },
});

const upload = multer({ storage });

// Rota para processar o vídeo
app.post('/process-video', upload.single('video'), (req, res) => {
  try {
    if (!req.file) {
      console.error('Nenhum arquivo foi enviado.');
      return res.status(400).send('Nenhum arquivo foi enviado.');
    }

    // Caminhos
    const videoPath = path.resolve(__dirname, 'uploads', req.file.filename);
    const outputVideoPath = path.resolve(__dirname, 'results', 'output_video.mp4');
    const modelPath = path.resolve(__dirname, 'models', 'model.py');



    // Logs para depuração
    console.log('Caminho do vídeo recebido:', videoPath);
    console.log('Caminho do modelo Python:', modelPath);
    console.log('Caminho do vídeo processado:', outputVideoPath);

    // Verificar se o script Python existe
    if (!fs.existsSync(modelPath)) {
      console.error(`Arquivo do modelo não encontrado: ${modelPath}`);
      return res.status(500).send('Arquivo do modelo não encontrado.');
    }

    // Verificar se o vídeo existe
    if (!fs.existsSync(videoPath)) {
      console.error(`Vídeo não encontrado: ${videoPath}`);
      return res.status(500).send('Vídeo não encontrado.');
    }

    // Comando para executar o script Python
    const command = `python "${modelPath}" --video "${videoPath}"`;
    console.log('Comando para executar o Python:', command);

    // Executar o script Python
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Erro ao executar o script Python:', stderr || error.message);
        return res.status(500).send('Erro ao processar o vídeo.');
      }

      console.log('Saída do script Python:', stdout);

      // Verificar se o vídeo processado foi gerado
      if (!fs.existsSync(outputVideoPath)) {
        console.error(`Vídeo processado não encontrado: ${outputVideoPath}`);
        return res.status(500).send('Erro ao gerar o vídeo processado.');
      }

      // Enviar o vídeo processado como resposta
      res.sendFile(outputVideoPath, { root: '.' }, (err) => {
        if (err) {
          console.error('Erro ao enviar o vídeo processado:', err.message);
          return res.status(500).send('Erro ao enviar o vídeo processado.');
        }
      });
    });
  } catch (error) {
    console.error('Erro inesperado:', error.message);
    res.status(500).send('Erro no servidor.');
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
