import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CadastroEvento({ onAdd, onUpdate }) {
  const navigate = useNavigate();
  const location = useLocation();
  const evento = location.state?.evento;

  // Estados do formulário
  const [titulo, setTitulo] = useState(evento?.titulo || "");
  const [data, setData] = useState(evento?.data || "");
  const [local, setLocal] = useState(evento?.local || "");
  const [descricao, setDescricao] = useState(evento?.descricao || "");
  const [status, setStatus] = useState(evento?.status || "");
  const [capacidade, setCapacidade] = useState(evento?.capacidade || "");
  const [mapa, setMapa] = useState(evento?.mapa || "");
  const [fotosTexto, setFotosTexto] = useState(evento?.fotos?.join("\n") || "");

  // Limpar formulário
  const limparFormulario = (e) => {
    e.preventDefault();
    setTitulo("");
    setData("");
    setLocal("");
    setDescricao("");
    setStatus("");
    setCapacidade("");
    setMapa("");
    setFotosTexto("");
  };

  // Envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!titulo || !data || !local || !descricao || !status || !capacidade) {
      alert("Preencha todos os campos.");
      return;
    }

    const statusFormatado = status.toLowerCase();
    const capacidadeNum = Number(capacidade);

    // Transformar fotosTexto em lista
    const fotosLista = fotosTexto
      .split("\n")
      .map((linha) => linha.trim())
      .filter((linha) => linha !== "");

    if (evento) {
      // atualização
      onUpdate(evento.id, {
        titulo,
        data,
        local,
        descricao,
        status: statusFormatado,
        capacidade: capacidadeNum,
        mapa,
        fotos: fotosLista
      });
    } else {
      // novo evento
      onAdd({
        titulo,
        data,
        local,
        descricao,
        status: statusFormatado,
        capacidade: capacidadeNum,
        vagasRestantes: capacidadeNum,
        mapa,
        fotos: fotosLista
      });
    }

    navigate("/evento");
  };

  return (
    <section className="stack">
      <h2>{evento ? "Editar Evento" : "Cadastrar Evento"}</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Título
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex: Demo do sistema"
          />
        </label>

        <label>
          Data
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
        </label>

        <label>
          Local
          <input
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            placeholder="Ex: Laboratório"
          />
        </label>

        <label>
          Descrição
          <input
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex: Descrição do Evento"
          />
        </label>

        <label>
          Status
          <input
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Ex: aberto / lotado"
          />
        </label>

        <label>
          Capacidade
          <input
            value={capacidade}
            onChange={(e) => setCapacidade(e.target.value)}
            placeholder="Ex: 60 pessoas"
          />
        </label>

        <label>
          URL do Mapa
          <input
            type="url"
            value={mapa}
            onChange={(e) => setMapa(e.target.value)}
            placeholder="Ex: https://maps.google.com/..."
          />
        </label>

        {/* Área de fotos com barra de rolagem */}
        <label>
  Fotos (uma por linha)
  <textarea
    value={fotosTexto}
    onChange={(e) => setFotosTexto(e.target.value)}
    placeholder="Cole uma URL de foto por linha"
    style={{
      width: "100%",
      height: "31px",       // altura fixa
      overflowY: "auto",     // rolagem vertical dentro do campo
      resize: "none",        // impede o usuário de redimensionar
      padding: "0.5rem",
      boxSizing: "border-box",

      backgroundColor: "#b1dcff", /* cor de fundo */
      border: "2px solid #4fbeff",      
      borderRadius: "4px",         // bordas arredondadas
      }}
    />
  </label>
         

        <div className="row">
          <button className="btn" type="submit">Salvar</button>
          <button className="btn" type="button" onClick={limparFormulario}>Limpar</button>
          <button className="btn ghost" type="button" onClick={() => navigate("/evento")}>Cancelar</button>
        </div>
      </form>
    </section>
  );
}