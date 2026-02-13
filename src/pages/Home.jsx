import React from "react";

export default function Home({ total, eventos }) {
  // pega o primeiro evento, se existir
  const proximoEvento = eventos && eventos.length > 0 ? eventos[0] : null;

  return (
    <section className="stack">
      <h2>Bem-vindos</h2>
      <p>Hoje vamos montar um mini sistema real usando componentes, rotas e estado.</p>
      
      <div className="box">
        Total de eventos cadastrados: <strong>{total}</strong>
      </div>

      {proximoEvento && (
        <div className="box">
          Próximo evento: <strong>{proximoEvento.titulo}</strong>
        </div>
      )}
    </section>
  );
}