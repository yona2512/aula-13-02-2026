import React, { useState } from "react"; //importa React e o useState para criar estados
import { useNavigate, useLocation } from "react-router-dom"; //Importa funções para navegação
import Modal from "../components/Modal"; // importa o componente Modal
import "../components/Modal.css"; //Importa o modal.css

// Componente principal
export default function CadastroEvento({ onAdd, onUpdate }) {
  const navigate = useNavigate(); //Permite navegar entre páginas
  const location = useLocation(); //permite acessar dados enviados
  const evento = location.state?.evento; //se existir o evento, está editando

  //estados do formulário 
  const [titulo, setTitulo] = useState(evento?.titulo || "");
  const [data, setData] = useState(evento?.data || "");
  const [local, setLocal] = useState(evento?.local || "");
  const [descricao, setDescricao] = useState(evento?.descricao || "");
  const [status, setStatus] = useState(evento?.status || "");
  const [capacidade, setCapacidade] = useState(evento?.capacidade || "");
  
  // Define vagasRestantes usando valor existente/capacidade
  const [vagasRestantes, setVagasRestantes] = useState(
    evento?.vagasRestantes ?? evento?.capacidade ?? ""
  );

  const [mapa, setMapa] = useState(evento?.mapa || "");
  
  // Junta as fotos, separado por quebra de linha
  const [fotosTexto, setFotosTexto] = useState(evento?.fotos?.join("\n") || "");
  
  const [showModal, setShowModal] = useState(false); // Controla exibição do modal

  // Função para limpar todos os campos do formulário
  const limparFormulario = (e) => {
    e.preventDefault(); // Evita comportamento padrão
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

  // Função chamada ao enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede recarregamento da página

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!titulo || !data || !local || !descricao || !status || !capacidade || vagasRestantes === "") {
      alert("Preencha todos os campos.");
      return; //para de executar se faltar algo
    }

    const statusFormatado = status.toLowerCase(); //deixa o status em minúsculo
    const capacidadeNum = Number(capacidade); // converte para número
    const vagasNum = Number(vagasRestantes); //converte para número

    // Transforma o texto das fotos em lista
    const fotosLista = fotosTexto
      .split("\n") // Separa por linha
      .map((linha) => linha.trim()) // Remove espaços
      .filter((linha) => linha !== ""); // Remove linhas vazias

    if (evento) {
      // Se já existe evento, atualiza
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
      // Se não existe, cria novo evento
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

    setShowModal(true); // Mostra modal de sucesso
  };

  // Fecha o modal e volta para página de eventos
  const fecharModal = () => {
    setShowModal(false);
    navigate("/evento");
  };

  return (
    <section className="stack">
      {/* Título muda dependendo se está editando ou criando */}
      <h2>{evento ? "Editar Evento" : "Cadastrar Evento"}</h2>

      {/* Formulário */}
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Título
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)} // Atualiza estado
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
          {/*botoes */}
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

      {/* Modal que aparece após salvar */}
      <Modal isOpen={showModal} onClose={fecharModal}>
        <h3>Evento salvo com sucesso!</h3>
        <p>
          {titulo} - {data} - {local} - {status} - {vagasRestantes} vagas restantes
        </p>
      </Modal>
    </section>
  );
}