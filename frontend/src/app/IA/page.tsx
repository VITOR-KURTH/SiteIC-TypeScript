"use client"; // Marcar como Client Component

import React, { useState } from "react";
import axios from "axios";
import styles from './IA.module.css';

const IA = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedVideo, setProcessedVideo] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Por favor, selecione um vídeo.');
      return;
    }

    const formData = new FormData();
    formData.append('video', selectedFile);

    try {
      const response = await axios.post('http://localhost:3333/process-video', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob', // Receber o vídeo processado
      });

      const url = URL.createObjectURL(new Blob([response.data]));
      setProcessedVideo(url);
    } catch (error) {
      console.error('Erro ao enviar o vídeo:', error);
      alert('Erro ao processar o vídeo. Tente novamente.');
    }
  };

  return (
    <div className={styles.containerIA}>
      <h1 className={styles.title1}>Inteligência Artificial</h1>
      <div className={styles.containerVideo}>
        <div className={styles.item1}>
          <p className={styles.title2}>Arraste e solte o vídeo aqui ou clique abaixo:</p>
          <input type="file" accept="video/*" onChange={handleFileChange} />
          <button className={styles.btnVideo} onClick={handleUpload}>Enviar</button>
        </div>
        {processedVideo && (
          <div>
            <h2>Vídeo Processado:</h2>
            <video controls src={processedVideo} width="600" />
          </div>
        )}
      </div>
    </div>
  );
};

export default IA;
