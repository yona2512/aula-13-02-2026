import React from "react";
//useParams: para acessar parâmetros da URL
//Link: para criar links de navegação
import { useParams, Link } from "react-router-dom";

// Recebe como prop um array de eventos
export default function DetalheEvento({ eventos }) {
  
  // useParams retorna um objeto com todos os parâmetros da URL
  const { id } = useParams();

  // Procura no array eventos, convertendo o id da URL para número
  const evento = eventos.find((e) => e.id === Number(id));

  // Se não encontrar o evento, mostra uma mensagem de erro
  if (!evento) {
    return <h2>Evento não encontrado.</h2>;
  }

  // Renderiza o evento
  return (
    <section className="stack">
      {/* Título do evento */}
      <h2>{evento.titulo}</h2>

      <div className="box">
        {/* Informações do evento */}
        <p><strong>Data:</strong> {evento.data}</p>
        <p><strong>Local:</strong> {evento.local}</p>
        <p><strong>Descrição:</strong> {evento.descricao}</p>
        <p><strong>Capacidade:</strong> {evento.capacidade}</p>
        <p><strong>Vagas Restantes:</strong> {evento.vagasRestantes}</p>

        {/* Mapa clicável */}
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

        {/* Fotos do evento */}
        {evento.fotos && evento.fotos.length > 0 && (
          <div>
            <h3>Fotos:</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {evento.fotos.map((foto, i) => (
                <li key={i} style={{ marginBottom: "1rem" }}>
                  <img
                    src={foto}
                    alt={`Foto ${i + 1}`}
                    style={{ maxWidth: "300px", borderRadius: "5px" }}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Link para voltar para a lista */}
      <Link to="/Evento">⬅ Voltar</Link>
    </section>
  );
}