"use client";

import React, { useState } from "react";
import axios from "axios";
import styles from './IA.module.css';

const IA = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [processingMessage, setProcessingMessage] = useState("");
  const [vehicleCounts, setVehicleCounts] = useState<{ [key: string]: number }>({});
  const [totalVehicles, setTotalVehicles] = useState<number>(0);
  const [heavyVehiclePercentage, setHeavyVehiclePercentage] = useState<number>(0);

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
      setUploadMessage("Enviando vídeo...");
      const uploadResponse = await axios.post('http://localhost:3001/upload-video', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 60000,
      });

      setUploadMessage("✅ Vídeo enviado com sucesso!");

      const filename = uploadResponse.data.filename;

      setProcessingMessage("Processando vídeo... Isso pode levar alguns segundos.");

      const processResponse = await axios.post('http://localhost:3001/process-video', {
        filename: filename,
      }, {
        timeout: 600000,
      });

      const counts = processResponse.data.counts;
      setVehicleCounts(counts);
      setProcessingMessage("✅ Processamento concluído!");

      const total = (Object.values(counts) as number[]).reduce((sum, value) => sum + value, 0);
      setTotalVehicles(total);

      const heavyClasses = ['caminhaog', 'caminhaop', 'onibus', 'van'];
      const heavyCount = heavyClasses.reduce((sum, key) => sum + (counts[key] || 0), 0);
      const heavyPercentage = total > 0 ? (heavyCount / total) * 100 : 0;
      setHeavyVehiclePercentage(heavyPercentage);

    } catch (error) {
      console.error('Erro ao enviar ou processar o vídeo:', error);
      setUploadMessage("Erro ao enviar ou processar o vídeo. Tente novamente.");
    }
  }; // ← FECHOU CERTO AQUI!

  // AGORA PODE TER O RETURN NORMALMENTE
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

          <p>{uploadMessage}</p>
          <p>{processingMessage}</p>

          {totalVehicles > 0 && (
            <div className={styles.countsContainer}>
              <h2 className={styles.countTitle}>Resultados da Contagem:</h2>
              <ul className={styles.countList}>
                {Object.entries(vehicleCounts)
                  .filter(([_, count]) => count > 0)
                  .map(([vehicle, count]) => (
                    <li key={vehicle} className={styles.countItem}>
                      {vehicle}: {count}
                    </li>
                ))}
              </ul>
              <p className={styles.summary}>🚗 Total de veículos: {totalVehicles}</p>
              <p className={styles.summary}>🚚 Percentual de veículos pesados: {heavyVehiclePercentage.toFixed(2)}%</p>

              {/* Botão de download do vídeo */}
              <a
                href="http://localhost:3001/download-video"
                className={styles.downloadButton}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                📥 Baixar Vídeo Processado
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IA;
