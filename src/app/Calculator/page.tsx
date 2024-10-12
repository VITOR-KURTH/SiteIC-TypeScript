"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";

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

interface ModelValues {
  param1: string;
  param2: string;
  param3: string;
  param4: string;
}

interface Result {
  l10?: string;
  l50?: string;
  l90?: string;
  leq?: string;
}

export default function Calculator() {
  const [selectedModel, setSelectedModel] = useState<string>("hanc");
  const [modelValues, setModelValues] = useState<ModelValues>({
    param1: "",
    param2: "",
    param3: "",
    param4: "",
  });

  const [result, setResult] = useState<Result>({
    l10: "",
    l50: "",
    l90: "",
    leq: "",
  });

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setSelectedModel(selectedOption);
    // Limpar os campos
    setModelValues({
      param1: "",
      param2: "",
      param3: "",
      param4: "",
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModelValues({
      ...modelValues,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    let newResults: Result = {};

    if (selectedModel === "hanc") {
      newResults = {
        ...newResults,
        l50: calcHanc(modelValues),
      };
    } else if (selectedModel === "johnson") {
      newResults = {
        ...newResults,
        l50: calcJohnson(modelValues),
      };
    } else if (selectedModel === "galloway") {
      newResults = {
        ...newResults,
        l50: calcGalloway(modelValues),
      };
    } else if (selectedModel === "burgess") {
      newResults = {
        ...newResults,
        l50: calcBurgess(modelValues),
      };
    } else if (selectedModel === "griffiths") {
      const griffithsResults = calcGriffiths(modelValues);
      newResults = {
        ...newResults,
        l10: griffithsResults.l10,
        l50: griffithsResults.l50,
        l90: griffithsResults.l90,
        leq: griffithsResults.leq,
      };
    } else if (selectedModel === "fagotti") {
      newResults = {
        ...newResults,
        l50: calcFagotti(modelValues),
      };
    } else if (selectedModel === "bolt") {
      newResults = {
        ...newResults,
        l50: calcBolt(modelValues),
      };
    } else if (selectedModel === "cstb") {
      const cstbResults = calcCstb(modelValues);
      newResults = {
        ...newResults,
        l50: cstbResults.l50,
        leq: cstbResults.leq,
      };
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
            <option className={`${styles.option}`} value="hanc">
              Hanc
            </option>
            <option className={`${styles.option}`} value="johnson">
              Johnson
            </option>
            <option className={`${styles.option}`} value="galloway">
              Galloway
            </option>
            <option className={`${styles.option}`} value="burgess">
              Burgess
            </option>
            <option className={`${styles.option}`} value="griffiths">
              Griffiths
            </option>
            <option className={`${styles.option}`} value="fagotti">
              Fagotti
            </option>
            <option className={`${styles.option}`} value="bolt">
              Bolt
            </option>
            <option className={`${styles.option}`} value="cstb">
              CSTB
            </option>
          </select>

          {/* Campos baseados no modelo selecionado */}
          {/* Adicione outros inputs e lógica similar aqui para cada modelo */}
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
          <div className={styles.resultInput}>
            <p className={styles.item2Text}>L50 (dB)</p>
            <input
              type="number"
              name="l50"
              value={result.l50}
              className={`${styles.input}`}
              readOnly
            />
          </div>
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

          {selectedModel === "burgess" ||
            (selectedModel === "griffiths" ||
              (selectedModel === "cstb" && (
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
              )))}
        </div>
      </div>
    </div>
  );
}
