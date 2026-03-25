router.post("/", async (req, res)  => { //rota POST 
try {
    //pega os dados enviados da requisição
    const { id, titulo, data, local, descricao, capacidade, vagas_restantes, mapa_url, status} = req.body;
    //validar os campos obrigatórios
    if(!id || !titulo || !data || !local || !descricao || !capacidade || !vagas_restantes || !mapa_url || !status) {
        return res.status(400).json({error: "Preencha todos os campos"})
        }

//Inserir os dados(INSERT) no Banco 
const r = await pool.query (
    `INSERT INTO eventos (id, titulo, data, local, descricao, capacidade, vagas_restantes, mapa_url, status) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,  
    [id, titulo, data, local, descricao, Number(capacidade), vagas_restantes, mapa_url ?? null, status]

    //o Number(capacidade) garante que seja só numeros
    //mapa_url ?? null -se ele não tiver valor, salva como null/nulo
);
    res.status(201).json(r.rows[0]); //retorna o status como 201 (criado)

} catch (error) {                       //se tiver erro, retorna como 500 e com a mensagem de erro
    res.status(500).json({ erro: "Erro ao criar evento", detalhe: error.message});
}


} //try fecha aqui
); //final da rota post