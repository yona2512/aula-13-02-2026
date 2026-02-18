import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

import Home from "./pages/Home";
import Eventos from "./pages/Eventos";
import CadastroEvento from "./pages/CadastroEvento";
import DetalheEvento from "./pages/DetalheEvento";

export default function App() {
  const [eventos, setEventos] = useState([
    {
      id: 1,
      titulo: "Reunião do Projeto",
      data: "2026-02-12",
      local: "Sala 2",
      descricao: "Discussão sobre andamento do projeto.",
      status: "Aberto"
    },
    {
      id: 2,
      titulo: "Review da Sprint",
      data: "2026-02-13",
      local: "Auditório",
      descricao: "Apresentação dos resultados da sprint.",
      status: "Lotado"
    },
  ]);

  // Adicionar novo evento
  function adicionarEvento(novo) {
    const eventoComId = { id: Date.now(), ...novo };
    setEventos((lista) => [eventoComId, ...lista]);
  }

  // Atualizar evento existente
  function atualizarEvento(id, dadosAtualizados) {
    setEventos((lista) =>
      lista.map((e) => e.id === id ? { ...e, ...dadosAtualizados } : e)
    );
  }

  // Remover evento específico
  function removerEvento(id) {
    setEventos((lista) => lista.filter((e) => e.id !== id));
  }

  // Remover todos os eventos
  function removerTodos() {
    setEventos([]);
  }

  return (
    <div className="app">
      <Header />
      <Menu />

      <main className="conteudo-principal">
        <Routes>
          {/* Página inicial */}
          <Route
            path="/"
            element={
              <Home
                total={eventos.length}
                eventos={eventos}
              />
            }
          />

          {/* Página de listagem */}
          <Route
            path="/Evento"
            element={
              <Eventos
                eventos={eventos}
                onRemover={removerEvento}
                onRemoverTodos={removerTodos}
              />
            }
          />

          {/* Rota de detalhe */}
          <Route
            path="/evento/:id"
            element={<DetalheEvento eventos={eventos} />}
          />

          {/* Página de cadastro/edição */}
          <Route
            path="/cadastrar"
            element={
              <CadastroEvento
                onAdd={adicionarEvento}
                onUpdate={atualizarEvento}
              />
            }
          />

          {/* Redirecionamento padrão */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
