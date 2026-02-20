import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Componente funcional para cadastro e edição de eventos
export default function CadastroEvento({ onAdd, onUpdate }) {
  // redireciona o usuário para outra página
  const navigate = useNavigate();

  // Hook para acessar dados já passados (ex: ao clicar em "Editar")
  const location = useLocation();

  // Recupera o evento enviado pela rota, se existir (edição)
  const evento = location.state?.evento;

  // Estados do formulário
  const [titulo, setTitulo] = useState(evento?.titulo || "");
  const [data, setData] = useState(evento?.data || "");
  const [local, setLocal] = useState(evento?.local || "");
  const [descricao, setDescricao] = useState(evento?.descricao || "");
  const [status, setStatus] = useState(evento?.status || "");

  // Função para limpar todos os campos do formulário
  const limparFormulario = (e) => {
    e.preventDefault(); // evita comportamento padrão do botão
    setTitulo("");
    setData("");
    setLocal("");
    setDescricao("");
    setStatus("");
  };

  // Função ao enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // previne recarregamento da página toda

    // Valida se todos os campos estão preenchidos
    if (!titulo || !data || !local || !descricao || !status) {
      alert("Preencha todos os campos.");
      return;
    }

    // Converte o status para minúsculas 
    const statusFormatado = status.toLowerCase();

    if (evento) {
      // Se existir evento ele atualiza
      onUpdate(evento.id, { titulo, data, local, descricao, status: statusFormatado });
    } else {
      // Se não existir ele adiciona novo evento
      onAdd({ titulo, data, local, descricao, status: statusFormatado });
    }

    // volta para a pagina eventos
    navigate("/evento");
  };

  return (
    <section className="stack">
      {/* Título Editar ou Cadastrar */}
      <h2>{evento ? "Editar Evento" : "Cadastrar Evento"}</h2>

      {/* formulário de cadastro/edição */}
      <form className="form" onSubmit={handleSubmit}>

        {/* Campo Título */}
        <label>
          Título
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex: Demo do sistema"
          />
        </label>

        {/* Campo Data */}
        <label>
          Data
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </label>

        {/* Campo Local */}
        <label>
          Local
          <input
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            placeholder="Ex: Laboratório"
          />
        </label>

        {/* Campo Descrição */}
        <label>
          Descrição
          <input
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex: Descrição do Evento"
          />
        </label>

        {/* Campo Status */}
        <label>
          Status
          <input
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Ex: aberto / lotado"
          />
        </label>

        {/* Botões */}
        <div className="row">
          {/* Salvar formulário */}
          <button className="btn" type="submit">Salvar</button>

          {/* Limpar campos */}
          <button className="btn" type="button" onClick={limparFormulario}>
            Limpar
          </button>

          {/* Cancelar e voltar para lista de eventos */}
          <button className="btn ghost" type="button" onClick={() => navigate("/evento")}>
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}