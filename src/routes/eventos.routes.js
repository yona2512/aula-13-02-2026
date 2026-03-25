router.post("/", async (req, res)  => {
try {
    const { id, titulo, data, local, descricao, capacidade, vagas_restantes, mapa_url, status} = req.body;
    //validar os campos obrigatórios
    if(!id || !titulo || !data || !local || !descricao || !capacidade || !vagas_restantes || !mapa_url || !status) {
        return res.status(400).json({error: "Preencha todos os campos"})
        }


//Inserir(INSERT) no Banco 
const r = await pool.query (
    `INSERT INTO eventos (id, titulo, data, local, descricao, capacidade, vagas_restantes, mapa_url, status) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,  
    [id, titulo, data, local, descricao, Number(capacidade), vagas_restantes, mapa_url ?? null, status]
);
    res.status(201).json(r.rows[0]);
} catch (error) {
    res.status(500).json({ erro: "Erro ao criar evento", detalhe: error.message});
}


} //try fecha aqui
);