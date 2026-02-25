import React from "react";
import { useNavigate } from "react-router-dom";

export default function CardEvento({ evento, onRemover }) {
  const navigate = useNavigate(); //muda a página através do código

  // Valores seguros com fallback
  const status = evento?.status || "desconhecido";
  const titulo = evento?.titulo || "Sem título";
  const data = evento?.data || "Data não informada";
  const local = evento?.local || "Local não informado";

  // Estilo da badge baseado no status (case-insensitive)
  const badgeStyle = {
    padding: "0.2rem 0.6rem",
    borderRadius: "12px",
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: status.toLowerCase() === "aberto" ? "#5cb85c" : "#d9534f",
    marginLeft: "0.5rem"
  };

  return (
    //estilo do card dos eventos
    <article
      className="card"
      style={{
        border: "4px solid #0066ff",
        borderRadius: "5px",
        padding: "1rem",
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background:"#7eb2ff",
        color: "#FFF",
        fontFamily: "Bookman, URW Bookman L, serif"
      }}
    >
      {/*informações no card */}
      <div>
        {/*estilo do titulo e status */}
        <h3 style={{ display: "flex", alignItems: "center" }}>
          {titulo}

          {/*mostra status */}
          <span style={badgeStyle}>{status.toUpperCase()}</span>
        </h3>

        {/*mostra data e local */}
        <p>{data} • {local}</p>


        {/*botao detalhes */}
        <button
          onClick={() => navigate(`/evento/${evento?.id}`)}
          style={{ marginRight: "0.5rem",
            backgroundColor: "#1E90FF",
            color: "#fff",
            border: "none",
            padding: "0.4rem 0.8rem",
            borderRadius: "4px",
            cursor: "pointer"}}
          
        >
          Ver detalhes
        </button>

        {/*botao editar */}
        <button
          onClick={() => navigate("/cadastrar", { state: { evento } })}
          style={{
            backgroundColor: "#1E90FF",
            color: "#fff",
            border: "none",
            padding: "0.4rem 0.8rem",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Editar
        </button>
      </div>

      {/*botao remover */}
      <button
        onClick={() => evento?.id && onRemover(evento.id)}
        style={{
          backgroundColor: "#d9534f",
          color: "#fff",
          border: "none",
          padding: "0.4rem 0.8rem",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Remover
      </button>
    </article>
  );
}
