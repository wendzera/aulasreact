import styles from "./NavBar.module.css"

const NavBar = () => {
    return (
      <nav className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
        </NavLink>
        <ul className={styles.links_list}>
          <li>
            <NavLink to="/home">Home</NavLink>         
          </li>
          <li>
          <NavLink to="/login">Logar</NavLink>         
          </li>
          <li>
          <NavLink to="/contact">Contato</NavLink>         
          </li>
          <li>
            <NavLink to="/about">Sobre</NavLink>         
          </li>
        </ul>
      </nav>
    );
   };