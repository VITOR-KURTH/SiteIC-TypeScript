import { sql } from './db.js';

export class UsuariosAll {
  // Lista todos os usuários
  async listUsuarios() {
    try {
      const usuarios = await sql`
        SELECT * FROM usuarios
      `;
      return usuarios;
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      throw new Error('Erro ao listar usuários');
    }
  }

  // Cria um novo usuário
  async createUsuarios(usuarios) {
    try {
      const { nome, senha, email } = usuarios;

      await sql`
        INSERT INTO usuarios (nome_usuario, senha_usuario, email_usuario)
        VALUES (${nome}, ${senha}, ${email})
      `;
      console.log('Usuário criado com sucesso:', usuarios);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw new Error('Erro ao criar usuário');
    }
  }

  // Atualiza um usuário existente
  async updateUsuarios(id_usuario, usuarios) {
    try {
      const { nome, senha, email } = usuarios;

      const result = await sql`
        UPDATE usuarios SET 
          nome_usuario = ${nome},
          senha_usuario = ${senha},
          email_usuario = ${email}
        WHERE id_usuario = ${id_usuario}
      `;

      if (result.count === 0) {
        throw new Error('Usuário não encontrado para atualização');
      }

      console.log('Usuário atualizado com sucesso:', usuarios);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw new Error('Erro ao atualizar usuário');
    }
  }

  // Deleta um usuário existente
  async deleteUsuarios(id_usuario) {
    try {
      const result = await sql`
        DELETE FROM usuarios WHERE id_usuario = ${id_usuario}
      `;

      if (result.count === 0) {
        throw new Error('Usuário não encontrado para exclusão');
      }

      console.log('Usuário excluído com sucesso:', id_usuario);
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      throw new Error('Erro ao excluir usuário');
    }
  }
}
