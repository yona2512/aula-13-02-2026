import express from "express";
import { pool } from "./db.js";

const router = express.Router();

// 🔍 LISTAR EVENTOS
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM eventos ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao listar eventos" });
  }
});

// ➕ CRIAR EVENTO
router.post("/", async (req, res) => {
  try {
    console.log("BODY:", req.body); // 👈 DEBUG

    const {
      titulo,
      data,
      local,
      descricao,
      capacidade,
      vagas_restantes,
      mapa_url,
      status
    } = req.body;

    // validação
    if (
      !titulo ||
      !data ||
      !local ||
      !descricao ||
      capacidade == null ||
      vagas_restantes == null ||
      !status
    ) {
      return res.status(400).json({
        erro: "Preencha todos os campos obrigatórios"
      });
    }

    const result = await pool.query(
      `INSERT INTO eventos 
      (titulo, data, local, descricao, capacidade, vagas_restantes, mapa_url, status)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [
        titulo,
        data,
        local,
        descricao,
        Number(capacidade),
        Number(vagas_restantes),
        mapa_url ?? null,
        status
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error("ERRO:", error);
    res.status(500).json({
      erro: "Erro ao criar evento",
      detalhe: error.message
    });
  }
});

export default router;