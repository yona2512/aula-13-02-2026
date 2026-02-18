import React, { useState } from "react";
import CardEvento from "../components/CardEvento";

export default function Evento({ eventos, onRemover, onRemoverTodos }) {
  const [buscaTitulo, setBuscaTitulo] = useState("");
  const [buscaLocal, setBuscaLocal] = useState("");

  const eventosFiltrados = eventos.filter(
    (e) =>
      e.titulo.toLowerCase().includes(buscaTitulo.toLowerCase()) &&
      e.local.toLowerCase().includes(buscaLocal.toLowerCase())
  );

  return (
    <section className="stack">
      <h2>Eventos</h2>

      

      <input
        type="text"
        placeholder="Buscar evento por título..."
        value={buscaTitulo}
        onChange={(e) => setBuscaTitulo(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem", backgroundColor: "lightblue" }}

      />

      <input
        type="text"
        placeholder="Filtrar por local..."
        value={buscaLocal}
        onChange={(e) => setBuscaLocal(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem", backgroundColor: "lightblue" }}

      />
      
{/* Botão remover todos */}
      {eventos.length > 0 && (
        <button
          onClick={() => {
            if (window.confirm("Tem certeza que deseja remover todos os eventos?")) {
              onRemoverTodos();
            }
          }}
          style={{
            marginBottom: "1rem",
            padding: "0.6rem",
            backgroundColor: "#d9534f",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Remover todos os Eventos
        </button>
      )}

      {eventosFiltrados.length === 0 ? (
        <p className="muted">Nenhum evento encontrado.</p>
      ) : (
        <div className="grid">
          {eventosFiltrados.map((e) => (
            <CardEvento key={e.id} evento={e} onRemover={onRemover} />
          ))}
        </div>
      )}
    </section>
  );
}
