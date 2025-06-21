import { Link } from "@tanstack/react-router";
import styles from "./index.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <Link to="/" className={styles.logoWrapper}>
        <img
          src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
          className={styles.logo}
        />
        <p>
          <span>R</span>ick & <span>M</span>orty
        </p>
      </Link>
      <div className={styles.nav}>
        <Link
          to="/"
          className={styles.navLink}
          activeProps={{ className: styles.active }}
        >
          Home
        </Link>
        {/* <Link to="/about" className="[&.active]:font-bold">
          About
        </Link> */}
      </div>
    </div>
  );
};

export default Header;
