import React, { useState } from "react"; // Importa React e useState
import { useParams, Link } from "react-router-dom"; // Importa funções de rota

// Componente que mostra os detalhes de um evento
export default function DetalheEvento({ eventos }) {

  const { id } = useParams(); // Pega o id que vem pela URL
  const evento = eventos.find((e) => e.id === Number(id)); 
  // Procura na lista de eventos aquele que tem o mesmo id

  // Se não encontrar o evento, mostra mensagem
  if (!evento) {
    return <h2>Evento não encontrado.</h2>;
  }

  return (
    <section className="stack">
      {/* Mostra o título do evento */}
      <h2>{evento.titulo}</h2>

      <div className="box">
        {/* Mostra as informações do evento */}
        <p><strong>Data:</strong> {evento.data}</p>
        <p><strong>Local:</strong> {evento.local}</p>
        <p><strong>Descrição:</strong> {evento.descricao}</p>
        <p><strong>Capacidade:</strong> {evento.capacidade}</p>
        <p><strong>Vagas Restantes:</strong> {evento.vagasRestantes}</p>

        {/* Se existir link do mapa, mostra ele */}
        {evento.mapa && (
          <p>
            <strong>Mapa:</strong>{" "}
            <a
              href={evento.mapa} // Link do mapa
              target="_blank" // Abre em nova aba
              rel="noopener noreferrer" // Segurança
              style={{ color: "#0066ff", fontWeight: "bold" }}
            >
              Ver localização no mapa
            </a>
          </p>
        )}

        {/* Se existir fotos, mostra o carrossel */}
        {evento.fotos && evento.fotos.length > 0 && (
          <div>
            <h3>Fotos:</h3>
            <Carrossel fotos={evento.fotos} />
          </div>
        )}
      </div>

      {/* Link para voltar para página de eventos */}
      <Link to="/Evento">⬅ Voltar</Link>
    </section>
  );
}

/* ========================= */
/*        CARROSSEL          */
/* ========================= */

// Componente responsável por mostrar as fotos uma por vez
function Carrossel({ fotos }) {

  const [index, setIndex] = useState(0); 
  // Guarda qual foto está sendo exibida

  // Função para voltar uma foto
  const anterior = () => {
    setIndex((prev) => (prev === 0 ? fotos.length - 1 : prev - 1));
  };

  // Função para avançar uma foto
  const proxima = () => {
    setIndex((prev) => (prev === fotos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="carrossel">
      <div className="carrossel-container">

        {/* Mostra a imagem atual */}
        <img
          src={fotos[index]}
          alt={`Foto ${index + 1}`}
          className="carrossel-img"
        />

        {/* Só mostra as setas se tiver mais de uma foto */}
        {fotos.length > 1 && (
          <>
            <button className="seta esquerda" onClick={anterior}>
              ❮
            </button>
            <button className="seta direita" onClick={proxima}>
              ❯
            </button>
          </>
        )}
      </div>

      {/* Bolinhas que indicam qual foto está ativa */}
      <div className="indicadores">
        {fotos.map((_, i) => (
          <span
            key={i}
            className={i === index ? "bolinha ativa" : "bolinha"}
            onClick={() => setIndex(i)} // Ao clicar muda para a foto escolhida
          ></span>
        ))}
      </div>
    </div>
  );
}