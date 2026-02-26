import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function DetalheEvento({ eventos }) {
  const { id } = useParams();
  const evento = eventos.find((e) => e.id === Number(id));

  if (!evento) {
    return <h2>Evento não encontrado.</h2>;
  }

  return (
    <section className="stack">
      <h2>{evento.titulo}</h2>

      <div className="box">
        <p><strong>Data:</strong> {evento.data}</p>
        <p><strong>Local:</strong> {evento.local}</p>
        <p><strong>Descrição:</strong> {evento.descricao}</p>
        <p><strong>Capacidade:</strong> {evento.capacidade}</p>
        <p><strong>Vagas Restantes:</strong> {evento.vagasRestantes}</p>

        {evento.mapa && (
          <p>
            <strong>Mapa:</strong>{" "}
            <a
              href={evento.mapa}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0066ff", fontWeight: "bold" }}
            >
              Ver localização no mapa
            </a>
          </p>
        )}

        {evento.fotos && evento.fotos.length > 0 && (
          <div>
            <h3>Fotos:</h3>
            <Carrossel fotos={evento.fotos} />
          </div>
        )}
      </div>

      <Link to="/Evento">⬅ Voltar</Link>
    </section>
  );
}

/* ========================= */
      /* CARROSSEL  */
/* ========================= */

function Carrossel({ fotos }) {
  const [index, setIndex] = useState(0);

  const anterior = () => {
    setIndex((prev) => (prev === 0 ? fotos.length - 1 : prev - 1));
  };

  const proxima = () => {
    setIndex((prev) => (prev === fotos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="carrossel">
      <div className="carrossel-container">
        <img
          src={fotos[index]}
          alt={`Foto ${index + 1}`}
          className="carrossel-img"
        />

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

      {/* Bolinhas indicadoras */}
      <div className="indicadores">
        {fotos.map((_, i) => (
          <span
            key={i}
            className={i === index ? "bolinha ativa" : "bolinha"}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}