import { sql } from './db.js'

sql`
CREATE TABLE historico (
  id_historico serial PRIMARY KEY NOT NULL,
  resultados decimal NOT NULL,
  modelos varchar(9) NOT NULL,
  parametros decimal NOT NULL
);

CREATE TABLE usuarios (
  id_usuario serial PRIMARY KEY NOT NULL,
  fk_id_historico int,
  FOREIGN KEY (fk_id_historico) REFERENCES historico(id_historico),
  nome_usuario varchar(255) NOT NULL,
  email_usuario varchar(255) NOT NULL UNIQUE,
  senha_usuario varchar(255) NOT NULL
);

CREATE TABLE resultados_ia (
  id_resultado serial PRIMARY KEY NOT NULL,
  fk_id_usuario int NOT NULL,
  FOREIGN KEY (fk_id_usuario) REFERENCES usuarios(id_usuario),
  qtd_veiculos_total int NOT NULL,
  qtd_carros int NOT NULL,
  qtd_motos int NOT NULL,
  qtd_pesadosG int NOT NULL,
  qtd_pesadosP int NOT NULL,
  qtd_van int NOT NULL,
  qtd_onibus int NOT NULL,
  qtd_tuktuk int NOT NULL
);
`.then(() => {
  console.log('tabela criada');
})