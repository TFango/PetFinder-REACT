import React from "react";

import styles from "../Header.module.css";

import { useAtomValue } from "jotai";
import { authAtom } from "../../../atoms/auth";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";

type Props = {
  onClose: () => void;
};

export function Menu({ onClose }: Props) {
  const auth = useAtomValue(authAtom);
  const navigate = useNavigate();

  const { logout } = useAuth();

  function handleGo(path: string) {
    onClose();
    navigate(path);
  }

  return (
    <div className={styles.menu}>
      <div className={styles.menuContent}>
        <button className={styles.closeMenu} onClick={onClose}>
          ✕
        </button>

        <nav className={styles.menuNav}>
          <button
            onClick={() => handleGo("user/menu")}
            className={styles.menuItem}
          >
            Mis datos
          </button>
          <button
            onClick={() => handleGo("pets/report")}
            className={styles.menuItem}
          >
            Mis mascotas reportadas
          </button>
          <button
            onClick={() => handleGo("pets/myPetsReport")}
            className={styles.menuItem}
          >
            Reportar mascota
          </button>
        </nav>

        <div className={styles.menuFooter}>
          {auth.isLoggedIn && <p className={styles.menuEmail}>{auth.email}</p>}
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className={styles.menuLogout}
          >
            CERRAR SESION
          </button>
        </div>
      </div>
    </div>
  );
}
