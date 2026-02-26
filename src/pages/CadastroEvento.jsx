import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../components/Modal";
import "../components/Modal.css";

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
  const [vagasRestantes, setVagasRestantes] = useState(
    evento?.vagasRestantes ?? evento?.capacidade ?? ""
  );
  const [mapa, setMapa] = useState(evento?.mapa || "");
  const [fotosTexto, setFotosTexto] = useState(
    evento?.fotos?.join("\n") || ""
  );
  const [showModal, setShowModal] = useState(false);

  // Limpar formulário
  const limparFormulario = (e) => {
    e.preventDefault();
    setTitulo("");
    setData("");
    setLocal("");
    setDescricao("");
    setStatus("");
    setCapacidade("");
    setVagasRestantes("");
    setMapa("");
    setFotosTexto("");
  };

  // Envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !titulo ||
      !data ||
      !local ||
      !descricao ||
      !status ||
      !capacidade ||
      vagasRestantes === ""
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    const statusFormatado = status.toLowerCase();
    const capacidadeNum = Number(capacidade);
    const vagasNum = Number(vagasRestantes);

    const fotosLista = fotosTexto
      .split("\n")
      .map((linha) => linha.trim())
      .filter((linha) => linha !== "");

    if (evento) {
      // Atualização
      onUpdate(evento.id, {
        titulo,
        data,
        local,
        descricao,
        status: statusFormatado,
        capacidade: capacidadeNum,
        vagasRestantes: vagasNum,
        mapa,
        fotos: fotosLista,
      });
    } else {
      // Novo evento
      onAdd({
        titulo,
        data,
        local,
        descricao,
        status: statusFormatado,
        capacidade: capacidadeNum,
        vagasRestantes: vagasNum,
        mapa,
        fotos: fotosLista,
      });
    }

    setShowModal(true);
  };

  const fecharModal = () => {
    setShowModal(false);
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

        <label>
          Capacidade
          <input
            type="number"
            value={capacidade}
            onChange={(e) => setCapacidade(e.target.value)}
            placeholder="Ex: 60"
          />
        </label>

        <label>
          Vagas Restantes
          <input
            type="number"
            value={vagasRestantes}
            onChange={(e) => setVagasRestantes(e.target.value)}
            placeholder="Ex: 30"
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

        <label>
          Fotos (uma por linha)
          <textarea
            value={fotosTexto}
            onChange={(e) => setFotosTexto(e.target.value)}
            placeholder="Cole uma URL de foto por linha"
            style={{
              width: "100%",
              height: "31px",
              overflowY: "auto",
              resize: "none",
              padding: "0.5rem",
              boxSizing: "border-box",
              backgroundColor: "#b1dcff",
              border: "2px solid #4fbeff",
              borderRadius: "4px",
            }}
          />
        </label>

        <div className="row">
          <button className="btn" type="submit">
            Salvar
          </button>
          <button className="btn" type="button" onClick={limparFormulario}>
            Limpar
          </button>
          <button
            className="btn ghost"
            type="button"
            onClick={() => navigate("/evento")}
          >
            Cancelar
          </button>
        </div>
      </form>

      <Modal isOpen={showModal} onClose={fecharModal}>
        <h3>Evento salvo com sucesso!</h3>
        <p>
          {titulo} - {data} - {local} - {status} - {vagasRestantes} vagas restantes
        </p>
      </Modal>
    </section>
  );
}