const pool = require("../../config/database");

class ClienteRepository {
  async listarTodos() {
    const query = `
      SELECT *
      FROM cliente
      WHERE deleted_at IS NULL
      ORDER BY id ASC
    `;

    const result = await pool.query(query);
    return result.rows;
  }

  async criar({ nome, cpf, data_nascimento, telefone, cidade, email }) {
    const query = `
      INSERT INTO cliente (
        nome,
        cpf,
        data_nascimento,
        telefone,
        cidade,
        email
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const values = [nome, cpf, data_nascimento, telefone, cidade, email];

    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = new ClienteRepository();