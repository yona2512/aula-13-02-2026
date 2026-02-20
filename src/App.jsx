// Importa React e useState para gerenciar estado local
import React, { useState } from "react";

// Importa react-router-dom para rotas
// Routes: container para todas as rotas
// Route: define cada rota
// Navigate: redireciona para outra rota
import { Routes, Route, Navigate } from "react-router-dom";

// Importa componentes de layout
import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

// Importa páginas
import Home from "./pages/Home";
import Eventos from "./pages/Eventos";
import CadastroEvento from "./pages/CadastroEvento";
import DetalheEvento from "./pages/DetalheEvento";

export default function App() {

  //Estado para armazenar a lista de eventos
  //dois eventos de exemplo
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

  // Função para adicionar um novo evento
  function adicionarEvento(novo) {

    // Cria um ID único utilizando timestamp
    const eventoComId = { id: Date.now(), ...novo };

    //atualiza o estado adicionando o novo evento no início da lista
    setEventos((lista) => [eventoComId, ...lista]);
  }

  //função de atualizar um evento existente
  function atualizarEvento(id, dadosAtualizados) {
    setEventos((lista) =>
      lista.map((e) => e.id === id ? { ...e, ...dadosAtualizados } : e)
    );
  }

  // Função para remover um evento pelo ID
  function removerEvento(id) {
    setEventos((lista) => lista.filter((e) => e.id !== id));
  }

  // remover todos os eventos
  function removerTodos() {
    setEventos([]);
  }


  return (
    <div className="app">
      {/* Cabeçalho */}
      <Header />

      {/* Menu de navegação */}
      <Menu />

      {/* Conteúdo principal */}
      <main className="conteudo-principal">
        <Routes>
          {/* Página inicial */}
          <Route
            path="/"
            element={
              <Home
                total={eventos.length} // envia total de eventos
                eventos={eventos}      // envia lista de eventos
              />
            }
          />

          {/* Página com lista de eventos */}
          <Route
            path="/Evento"
            element={
              <Eventos
                eventos={eventos}        // lista de eventos
                onRemover={removerEvento}   // função para remover um evento
                onRemoverTodos={removerTodos} // remover todos
              />
            }
          />

          {/* Página de detalhes de um evento escolhido*/}
          <Route
            path="/evento/:id"
            element={<DetalheEvento eventos={eventos} />}
          />

          {/* Página de cadastro/edição do evento */}
          <Route
            path="/cadastrar"
            element={
              <CadastroEvento
                onAdd={adicionarEvento}   // função para adicionar
                onUpdate={atualizarEvento}  // função para atualizar
              />
            }
          />

          {/* Redirecionamento para a página inicial se a rota não existir */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Rodapé do site */}
      <Footer />
    </div>
  );
}