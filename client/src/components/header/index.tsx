import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Header.module.css";

import { MenuButton } from "./Menu/MenuButton";
import { Menu } from "./Menu/Menu";

export function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenMenu = () => {
    setOpen(true);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  const handlerClick = () => {
    navigate("/");
  };

  return (
    <header className={styles.root}>
      <div className={styles.container}>
        <img
          src="/icons/icon.svg"
          alt=""
          className={styles.logo}
          onClick={handlerClick}
        />

        <MenuButton onClick={handleOpenMenu} />
      </div>

      {open && <Menu onClose={handleCloseMenu} />}
    </header>
  );
}
