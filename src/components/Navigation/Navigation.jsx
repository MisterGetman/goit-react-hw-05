import clsx from "clsx";
import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const buildLinkClass = ({ isActive }) =>
    clsx(css.navLink, isActive && css.active);

  return (
    <header className={css.header}>
      <nav className={css.navMenu}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={buildLinkClass}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
