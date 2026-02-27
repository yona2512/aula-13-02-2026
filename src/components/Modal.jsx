import React from "react"; // Importa o React
import "./Modal.css"; // Importa o CSS do modal

// Componente Modal
export default function Modal({ isOpen, onClose, children }) {

  // Se isOpen for falso, não mostra nada
  if (!isOpen) return null;

  return (
    // Fundo escuro do modal
    <div className="modal-overlay" onClick={onClose}>
      
      {/* Caixa branca do modal */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/*conteúdo que for passado para o modal*/}
        {children}

        {/* Botão para fechar*/}
        <button className="modal-close" onClick={onClose}>
          Fechar
        </button>

      </div>
    </div>
  );
}