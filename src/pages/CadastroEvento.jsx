import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../components/Modal";
import "../components/Modal.css";

export default function CadastroEvento({ 
  onAdd, 
  eventoEditando, 
  onUpdate, 
  onCancelarEdicao 
}) {

  const navigate = useNavigate();
  const location = useLocation();
  const evento = location.state?.evento || eventoEditando;

  // Estados do formulário
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");
  const [capacidadeTotal, setCapacidadeTotal] = useState("");
  const [vagasRestantes, setVagasRestantes] = useState("");
  const [mapa, setMapa] = useState("");
  const [fotosTexto, setFotosTexto] = useState("");

  const [showModal, setShowModal] = useState(false);

  // ✅ NOVO: preenche ao editar (useEffect)
  useEffect(() => {
    if (evento) {
      setTitulo(evento.titulo || "");
      setData(evento.data || "");
      setLocal(evento.local || "");
      setDescricao(evento.descricao || "");
      setStatus(evento.status || "");
      setCapacidadeTotal(evento.capacidadeTotal || "");
      setVagasRestantes(
        evento.vagasRestantes ?? evento.capacidadeTotal ?? ""
      );
      setMapa(evento.mapa || "");
      setFotosTexto((evento.fotos || []).join("\n"));
    }
  }, [evento]);

  // Limpar formulário
  const limparFormulario = (e) => {
    if (e) e.preventDefault();
    setTitulo("");
    setData("");
    setLocal("");
    setDescricao("");
    setStatus("");
    setCapacidadeTotal("");
    setVagasRestantes("");
    setMapa("");
    setFotosTexto("");
  };

  // ✅ NOVO: cancelar completo (igual ao outro código)
  const cancelar = () => {
    limparFormulario();
    if (eventoEditando && onCancelarEdicao) {
      onCancelarEdicao();
    }
    navigate("/evento");
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!titulo || !data || !local || !descricao || !status || !capacidadeTotal) {
      alert("Preencha todos os campos.");
      return;
    }

    const capacidadeNum = Number(capacidadeTotal);
    if (!capacidadeNum || capacidadeNum <= 0) {
      alert("Capacidade deve ser maior que 0.");
      return;
    }

    const vagasNum = Number(vagasRestantes || capacidadeNum);

    const fotosLista = fotosTexto
      .split("\n")
      .map((linha) => linha.trim())
      .filter(Boolean);

    const statusFormatado = status.toLowerCase();

    if (evento) {
      // ✅ EDITAR com regra de vagas
      onUpdate(evento.id, {
        titulo,
        data,
        local,
        descricao,
        status: statusFormatado,
        capacidadeTotal: capacidadeNum,
        vagasRestantes: Math.min(vagasNum, capacidadeNum),
        mapa,
        fotos: fotosLista,
      });

      if (onCancelarEdicao) onCancelarEdicao();

    } else {
      // ✅ CRIAR
      onAdd({
        titulo,
        data,
        local,
        descricao,
        status: statusFormatado,
        capacidadeTotal: capacidadeNum,
        vagasRestantes: capacidadeNum,
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
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </label>

        <label>
          Data
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
        </label>

        <label>
          Local
          <input value={local} onChange={(e) => setLocal(e.target.value)} />
        </label>

        <label>
          Descrição
          <input value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </label>

        <label>
          Status
          <input value={status} onChange={(e) => setStatus(e.target.value)} />
        </label>

        <label>
          Capacidade Total
          <input
            type="number"
            min={1}
            value={capacidadeTotal}
            onChange={(e) => setCapacidadeTotal(e.target.value)}
          />
        </label>

        <label>
          Vagas Restantes
          <input
            type="number"
            value={vagasRestantes}
            onChange={(e) => setVagasRestantes(e.target.value)}
          />
        </label>

        <label>
          URL do Mapa
          <input
            type="url"
            value={mapa}
            onChange={(e) => setMapa(e.target.value)}
          />
        </label>

        <label>
          Fotos (uma por linha)
          <textarea
            value={fotosTexto}
            onChange={(e) => setFotosTexto(e.target.value)}
          />
        </label>

        <div className="row">
          <button className="btn" type="submit">
            {evento ? "Salvar alterações" : "Salvar"}
          </button>

          <button className="btn" type="button" onClick={limparFormulario}>
            Limpar
          </button>

          {/* ✅ atualizado */}
          <button className="btn ghost" type="button" onClick={cancelar}>
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