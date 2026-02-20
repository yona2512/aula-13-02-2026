import React from "react";
// Recebe como props: total de eventos e o array de eventos
export default function Home({ total, eventos }) {

  // se 'eventos' não ter ou estiver vazio, 'proximoEvento' será nulo/null
  const proximoEvento = eventos && eventos.length > 0 ? eventos[0] : null;

  return (
    <section className="stack">
      {/* Título da página */}
      <h2>Bem-vindos</h2>

      {/* Texto introdução */}
      <p>Hoje vamos montar um mini sistema real usando componentes, rotas e estado.</p>
      
      {/*mostra o total de eventos cadastrados */}
      <div className="box">
        Total de eventos cadastrados: <strong>{total}</strong>
      </div>

      {/* Se houver um próximo evento, mostra seu título */}
      {proximoEvento && (
        <div className="box">
          Próximo evento: <strong>{proximoEvento.titulo}</strong>
        </div>
      )}
    </section>
  );
}