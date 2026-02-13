import React from "react";
import { useParams, Link } from "react-router-dom";

export default function DetalheEvento({ eventos }) {
  const { id } = useParams();

  // converter para número porque seus IDs são number
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
      </div>

      <Link to="/Evento">⬅ Voltar</Link>
    </section>
  );
}
