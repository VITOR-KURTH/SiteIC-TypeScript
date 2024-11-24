import { sql } from './db.js';

export class UsuariosAll {
  // Verifica se o email já existe no banco de dados
  async emailExists(email) {
    try {
      const result = await sql`
        SELECT COUNT(*) FROM usuarios WHERE email_usuario = ${email}
      `;
      return result[0].count > 0;
    } catch (error) {
      console.error('Erro ao verificar email:', error);
      throw new Error('Erro ao verificar email');
    }
  }

  // Cria um novo usuário, validando se o email é único
  async createUsuario(usuario) {
    try {
      const { nome, email, senha } = usuario;

      if (await this.emailExists(email)) {
        throw new Error('E-mail já está em uso');
      }

      await sql`
        INSERT INTO usuarios (nome_usuario, email_usuario, senha_usuario)
        VALUES (${nome}, ${email}, ${senha})
      `;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  }

  // Atualiza um usuário, validando se o novo email não conflita com outros
  async updateUsuarios(id_usuario, usuario) {
    try {
      const { nome, email, senha } = usuario;

      const usuarioAtual = await sql`
        SELECT * FROM usuarios WHERE id_usuario = ${id_usuario}
      `;

      if (!usuarioAtual.length) {
        throw new Error('Usuário não encontrado');
      }

      if (usuarioAtual[0].email_usuario !== email && (await this.emailExists(email))) {
        throw new Error('E-mail já está em uso');
      }

      const result = await sql`
        UPDATE usuarios SET 
          nome_usuario = ${nome},
          email_usuario = ${email},
          senha_usuario = ${senha}
        WHERE id_usuario = ${id_usuario}
      `;

      if (result.count === 0) {
        throw new Error('Usuário não encontrado para atualização');
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  }
}
