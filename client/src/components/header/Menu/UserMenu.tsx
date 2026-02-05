import React from "react";

import styles from "../Header.module.css";

type Props = {
  onClose: () => void;
};

export function UserMenu({ onClose }: Props) {
  return (
    <div className={styles.menu}>
      <div className={styles.menuContent}>
        <button className={styles.closeMenu} onClick={onClose}>
          ✕
        </button>

        <nav className={styles.menuNav}>
          <button className={styles.menuItem}>Mis datos</button>
          <button className={styles.menuItem}>Mis mascotas reportadas</button>
          <button className={styles.menuItem}>Reportar mascota</button>
        </nav>

        <div className={styles.menuFooter}>
          <p className={styles.menuEmail}>fakujimenez@gmail.com</p>
          <button className={styles.menuLogout}>CERRAR SESION</button>
        </div>
      </div>
    </div>
  );
}
