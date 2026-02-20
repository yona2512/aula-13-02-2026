import React, { useState } from "react";
import CardEvento from "../components/CardEvento";

export default function Evento({ eventos, onRemover, onRemoverTodos }) {

  // busca por título
  const [buscaTitulo, setBuscaTitulo] = useState("");
  const [buscaLocal, setBuscaLocal] = useState("");

  // cria uma nova lista filtrando os eventos
  const eventosFiltrados = eventos.filter(
    (e) =>
      // Verifica o título do evento 
      e.titulo.toLowerCase().includes(buscaTitulo.toLowerCase()) &&
      e.local.toLowerCase().includes(buscaLocal.toLowerCase())
  );

  return (
    <section className="stack">
      <h2>Eventos</h2>

      {/*buscar por título*/}
      <input
        type="text"
        placeholder="Buscar evento por título..."
        value={buscaTitulo} 
        onChange={(e) => setBuscaTitulo(e.target.value)} 
        // atualiza o estado quando o usuário digita

        style={{ 
          marginBottom: "1rem", 
          padding: "0.5rem", 
          backgroundColor: "#e6f7ff", 
          border: "3px solid #007acc",  
          borderRadius: "8px" 
        }}
      />


      <input
        type="text"
        placeholder="Filtrar por local..."
        value={buscaLocal} 
        onChange={(e) => setBuscaLocal(e.target.value)} 

        style={{ 
          marginBottom: "1rem", 
          padding: "0.5rem", 
          backgroundColor: "#e6f7ff", 
          border: "3px solid #007acc",  
          borderRadius: "8px" 
        }}
      />
      {/*botoes*/}

      {/*Só aparece se existir pelo menos um evento*/}
      {eventos.length > 0 && (
        <button
          onClick={() => {
            // Pergunta de confirmação
            if (window.confirm("Tem certeza que deseja remover todos os eventos?")) {
              onRemoverTodos(); //chama a função do componente pai
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

      {/*verifica se não sobrou nenhum evento*/}
      {eventosFiltrados.length === 0 ? (

        <p className="muted">Nenhum evento encontrado.</p>

      ) : (

        //se tiver eventos filtrados, mostra a lista
        <div className="grid">
          {eventosFiltrados.map((e) => (
            //cada evento, mostra/renderiza um card dos eventos

            //key ajuda o React a identificar cada item da lista
            <CardEvento 
              key={e.id} 
              evento={e} 
              onRemover={onRemover} 
            />
          ))}
        </div>
      )}

    </section>
  );
}