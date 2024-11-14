'use client'
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import '../../styles/Global.css';


import {
  calcHanc,
  calcJohnson,
  calcGalloway,
  calcBurgess,
  calcGriffiths,
  calcFagotti,
  calcBolt,
  calcCstb
} from "./models";

export default function Calculator() {
  const [selectedModel, setSelectedModel] = useState("hanc");
  const [modelValues, setModelValues] = useState({
    param1: '',
    param2: '',
    param3: '',
    param4: '',
  });

  const [result, setResult] = useState({
    l10: "",
    l50: "",
    l90: "",
    leq: "",
  });

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setSelectedModel(selectedOption);
    setModelValues({
      param1: '',
      param2: '',
      param3: '',
      param4: '',
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setModelValues({
      ...modelValues,
      [name]: value, // Armazenar como string
    });
  };

  useEffect(() => {
    const newResults = {
      l10: "",
      l50: "",
      l90: "",
      leq: "",
    };

    const numericModelValues = {
      param1: parseFloat(modelValues.param1) || 0, // Converte para número, padrão 0 se vazio
      param2: parseFloat(modelValues.param2) || 0,
      param3: parseFloat(modelValues.param3) || 0,
      param4: parseFloat(modelValues.param4) || 0,
    };

    if (selectedModel === "hanc") {
      newResults.l50 = calcHanc(numericModelValues);
    } else if (selectedModel === "johnson") {
      newResults.l50 = calcJohnson(numericModelValues);
    } else if (selectedModel === "galloway") {
      newResults.l50 = calcGalloway(numericModelValues);
    } else if (selectedModel === "burgess") {
      newResults.l50 = calcBurgess(numericModelValues);
    } else if (selectedModel === "griffiths") {
      const griffithsResults = calcGriffiths(numericModelValues);
      newResults.l10 = griffithsResults.l10;
      newResults.l50 = griffithsResults.l50;
      newResults.l90 = griffithsResults.l90;
      newResults.leq = griffithsResults.leq;
    } else if (selectedModel === "fagotti") {
      const fagottiResults = calcFagotti(numericModelValues);
      newResults.l50 = fagottiResults; // Defina corretamente o resultado
    } else if (selectedModel === "bolt") {
      const boltResults = calcBolt(numericModelValues);
      newResults.l50 = boltResults; // Defina corretamente o resultado
    } else if (selectedModel === "cstb") {
      const cstbResults = calcCstb(numericModelValues);
      newResults.l50 = cstbResults.l50;
      newResults.leq = cstbResults.leq;
    }
    setResult(newResults);
  }, [modelValues, selectedModel]);


  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.item1}>
          <h1 className={styles.title}>Parâmetros</h1>
          <p className={styles.item1Text}>Modelo</p>
          <select
            name="models"
            id="models"
            className={`${styles.inputSelect}`}
            onChange={handleModelChange}
          >
            <option className={`${styles.option}`} value="hanc">Hanc</option>
            <option className={`${styles.option}`} value="johnson">Johnson</option>
            <option className={`${styles.option}`} value="galloway">Galloway</option>
            <option className={`${styles.option}`} value="burgess">Burgess</option>
            <option className={`${styles.option}`} value="griffiths">Griffiths</option>
            <option className={`${styles.option}`} value="fagotti">Fagotti</option>
            <option className={`${styles.option}`} value="bolt">Bolt</option>
            <option className={`${styles.option}`} value="cstb">CSTB</option>
          </select>
          {selectedModel !== "fagotti" && (
            <div>
              <p className={styles.item1Text}>Qtd. Veículos</p>
              <input
                type="number"
                name="param1"
                className={`${styles.input}`}
                value={modelValues.param1}
                onChange={handleInputChange}
              />
            </div>
          )}
          {selectedModel === "fagotti" && (
            <div>
              <p className={styles.item1Text}>Qtd. de Veículos leves</p>
              <input
                type="number"
                name="param1"
                className={`${styles.input}`}
                value={modelValues.param1}
                onChange={handleInputChange}
              />
              <p className={styles.item1Text}>Qtd. de Veículos pesados</p>
              <input
                type="number"
                name="param2"
                className={`${styles.input}`}
                value={modelValues.param2}
                onChange={handleInputChange}
              />
              <p className={styles.item1Text}>Qtd. de motocicletas</p>
              <input
                type="number"
                name="param3"
                className={`${styles.input}`}
                value={modelValues.param3}
                onChange={handleInputChange}
              />
              <p className={styles.item1Text}>Qtd. de ônibus</p>
              <input
                type="number"
                name="param4"
                className={`${styles.input}`}
                value={modelValues.param4}
                onChange={handleInputChange}
              />
            </div>
          )}
          {selectedModel !== "fagotti" && selectedModel !== "cstb" && (
            <div>
              <p className={styles.item1Text}>Distância entre o ponto de observação e o centro da pista (m)</p>
              <input
                type="number"
                name="param2"
                className={`${styles.input}`}
                value={modelValues.param2}
                onChange={handleInputChange}
              />
            </div>
          )}
          {selectedModel === "cstb" && (
            <div>
              <p className={styles.item1Text}>Largura da pista (m)</p>
              <input
                type="number"
                name="param2"
                className={`${styles.input}`}
                value={modelValues.param2}
                onChange={handleInputChange}
              />
            </div>
          )}
          {(selectedModel === "galloway" || selectedModel === "burgess" || selectedModel === "griffiths") && (
            <div>
              <p className={styles.item1Text}>Porcentagem de veículos pesados em tráfego (%)</p>
              <input
                type="number"
                name="param3"
                className={`${styles.input}`}
                value={modelValues.param3}
                onChange={handleInputChange}
              />
            </div>
          )}
          {selectedModel === "johnson" ? (
            <div>
              <p className={styles.item1Text}>Velocidade mediana dos veículos (km)</p>
              <input
                type="number"
                name="param3"
                className={`${styles.input}`}
                value={modelValues.param3}
                onChange={handleInputChange}
              />
            </div>
          ) : (
            selectedModel === "galloway" && (
              <div>
                <p className={styles.item1Text}>Velocidade mediana dos veículos (km)</p>
                <input
                  type="number"
                  name="param4"
                  className={`${styles.input}`}
                  value={modelValues.param4}
                  onChange={handleInputChange}
                />
              </div>
            )
          )}
        </div>

        <div className={styles.item2}>
          <h1 className={styles.title}>Resultados</h1>
          {selectedModel === "griffiths" && (
            <div className={styles.resultInput}>
              <p className={styles.item2Text}>L10 (dB)</p>
              <input
                type="number"
                name="l10"
                value={result.l10}
                className={`${styles.input}`}
                disabled
              />
            </div>
          )}
          {selectedModel === "burgess" && (
            <div className={styles.resultInput}>
              <p className={styles.item2Text}>L50 (dB)</p>
              <input
                type="number"
                name="l50"
                value={result.l50}
                className={`${styles.input}`}
                disabled
              />
            </div>
          )}
          {(selectedModel === "galloway" || selectedModel === "johnson") && (
            <div className={styles.resultInput}>
              <p className={styles.item2Text}>L50 (dB)</p>
              <input
                type="number"
                name="l50"
                value={result.l50}
                className={`${styles.input}`}
                disabled
              />
            </div>
          )}
          {selectedModel === "hanc" && (
            <div className={styles.resultInput}>
              <p className={styles.item2Text}>L50 (dB)</p>
              <input
                type="number"
                name="l50"
                value={result.l50}
                className={`${styles.input}`}
                disabled
              />
            </div>
          )}
          {selectedModel === "griffiths" && (
            <div className={styles.resultInput}>
              <p className={styles.item2Text}>L90 (dB)</p>
              <input
                type="number"
                name="l90"
                value={result.l90}
                className={`${styles.input}`}
                disabled
              />
            </div>
          )}
          {(selectedModel === "griffiths") && (
            <div className={styles.resultInput}>
              <p className={styles.item2Text}>Leq (dB)</p>
              <input
                type="number"
                name="leq"
                value={result.leq}
                className={`${styles.input}`}
                disabled
              />
            </div>
          )}
          {(selectedModel === "fagotti" || selectedModel === "bolt") && (
            <div className={styles.resultInput}>
              <p className={styles.item2Text}>L50 (dB)</p>
              <input
                type="number"
                name="l50"
                value={result.l50}
                className={`${styles.input}`}
                disabled
              />
            </div>
          )}
          {selectedModel === "cstb" && (
            <div>
              <p className={styles.item2Text}>L50 (dB)</p>
              <input
                type="number"
                name="l50"
                value={result.l50}
                className={`${styles.input}`}
                disabled
              />
              <p className={styles.item2Text}>Leq (dB)</p>
              <input
                type="number"
                name="leq"
                value={result.leq}
                className={`${styles.input}`}
                disabled
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
