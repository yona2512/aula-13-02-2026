import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CadastroEvento({ onAdd, onUpdate }) {
  const navigate = useNavigate();
  const location = useLocation();
  const evento = location.state?.evento; // dados do botão Editar

  // Estados com valores padrão
  const [titulo, setTitulo] = useState(evento?.titulo || "");
  const [data, setData] = useState(evento?.data || "");
  const [local, setLocal] = useState(evento?.local || "");
  const [descricao, setDescricao] = useState(evento?.descricao || "");
  const [status, setStatus] = useState(evento?.status || "");

  const limparFormulario = (e) => {
    e.preventDefault();
    setTitulo("");
    setData("");
    setLocal("");
    setDescricao("");
    setStatus("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!titulo || !data || !local || !descricao || !status) {
      alert("Preencha todos os campos.");
      return;
    }

    // Normaliza o status para minúsculas
    const statusFormatado = status.toLowerCase();

    if (evento) {
      // Edição
      onUpdate(evento.id, { titulo, data, local, descricao, status: statusFormatado });
    } else {
      // Novo cadastro
      onAdd({ titulo, data, local, descricao, status: statusFormatado });
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
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
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

        <div className="row">
          <button className="btn" type="submit">Salvar</button>
          <button className="btn" type="button" onClick={limparFormulario}>
            Limpar
          </button>
          <button className="btn ghost" type="button" onClick={() => navigate("/evento")}>
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}
