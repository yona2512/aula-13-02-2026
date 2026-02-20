import React from "react";
//useParams:para acessar parâmetros da URL
//Link:para criar links de navegação
import { useParams, Link } from "react-router-dom";

// Recebe como prop um array de eventos
export default function DetalheEvento({ eventos }) {
  
  // useParams retorna um objeto com todos os parâmetros da URL ou seja, ali ele pega o id
  const { id } = useParams();

  // Procura no array eventos, onde um evento que tem o id que corresponda ao da URL
  //convertendo o id da URL para número
  const evento = eventos.find((e) => e.id === Number(id));

  // Se não encontrar o evento, mostra uma mensagem de erro
  if (!evento) {
    return <h2>Evento não encontrado.</h2>;
  }

  // Se encontrar o evento, renderiza ele
  return (
    <section className="stack">
      {/* Título do evento */}
      <h2>{evento.titulo}</h2>

      <div className="box">
        {/* Informações do evento*/}
        <p><strong>Data:</strong> {evento.data}</p>
        <p><strong>Local:</strong> {evento.local}</p>
        <p><strong>Descrição:</strong> {evento.descricao}</p>
      </div>

      {/* Link para voltar para a lista*/}
      <Link to="/Evento">⬅ Voltar</Link>
    </section>
  );
}