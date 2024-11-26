"use client"; // Marcar como Client Component

import React, { useState } from "react";
import axios from "axios";
import styles from './IA.module.css';

const IA = () => {
  // Estado para armazenar o arquivo selecionado pelo usuário
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Estado para armazenar o link do vídeo processado pela IA
  const [processedVideo, setProcessedVideo] = useState<string | null>(null);

  // Função para capturar o arquivo selecionado pelo usuário no input
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // Armazena o primeiro arquivo selecionado no estado `selectedFile`
      setSelectedFile(event.target.files[0]);
    }
  };

  // Função para enviar o vídeo ao servidor para processamento
  const handleUpload = async () => {
    // Verifica se o usuário selecionou um arquivo
    if (!selectedFile) {
      alert('Por favor, selecione um vídeo.'); // Exibe alerta se nenhum arquivo foi selecionado
      return;
    }

    // Cria um formulário de dados para enviar o vídeo
    const formData = new FormData();
    formData.append('video', selectedFile); // Adiciona o arquivo ao formulário com o campo 'video'

    try {
      // Faz uma solicitação POST para o servidor enviar o vídeo
      const response = await axios.post('http://localhost:3001/process-video', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }, // Define o cabeçalho como envio de formulário
        responseType: 'blob', // Espera um arquivo (blob) como resposta
        timeout: 60000, // Define um tempo limite de 60 segundos para a solicitação
      });

      // Cria uma URL temporária para o vídeo processado retornado pelo servidor
      const url = URL.createObjectURL(new Blob([response.data]));
      setProcessedVideo(url); // Armazena o link do vídeo processado no estado
    } catch (error) {
      // Exibe erro no console e alerta o usuário
      console.error('Erro ao enviar o vídeo:', error);
      alert('Erro ao processar o vídeo. Tente novamente.');
    }
  };

  return (
    <div className={styles.containerIA}>
      <h1 className={styles.title1}>Inteligência Artificial</h1>
      <div className={styles.containerVideo}>
        <div className={styles.item1}>
          <p className={styles.title2}>Clique abaixo para enviar o vídeo:</p>
          <label htmlFor="videoUpload" className={styles.btnVideo}>
            Selecionar Vídeo
          </label>
          <input
            id="videoUpload"
            className={styles.hiddenInput}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
          />
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
