import React from "react"; //importa o react
import { NavLink } from "react-router-dom"; //// Importa o NavLink para navegação entre rotas

export default function Menu() {
  return (

      //navegação entre os links
    <nav className="menu">
      <NavLink to="/" className={({ isActive }) => (isActive ? "link active" : "link")}>
        Home
      </NavLink>

      <NavLink to="/evento" className={({ isActive }) => (isActive ? "link active" : "link")}>
        Eventos
      </NavLink>

      <NavLink to="/cadastrar" className={({ isActive }) => (isActive ? "link active" : "link")}>
        Cadastrar
      </NavLink>
    </nav>
  );
}