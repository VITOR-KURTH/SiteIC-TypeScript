import fastify from 'fastify';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Inicializa o servidor Fastify
const server = fastify({ logger: true });

// Configuração do Multer para gerenciar upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = './uploads';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath); // Cria a pasta se não existir
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).single('video'); // Define que será recebido apenas um arquivo chamado "video"

// Rota para processar o vídeo
server.post('/process-video', async (request, reply) => {
  const data = await new Promise((resolve, reject) => {
    upload(request.raw, reply.raw, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(request.raw.file);
      }
    });
  });

  const filePath = path.join('./uploads', data.filename);

  reply.send({ message: 'Vídeo recebido com sucesso!', path: filePath });
});

// Inicia o servidor
const startServer = async () => {
  try {
    await server.listen({ port: 4000 });
    console.log('Servidor rodando em http://localhost:4000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

startServer();
