import React from "react";
import { useState } from "react";

import styles from "./Header.module.css";

import { MenuButton } from "./Menu/MenuButton";
import { UserMenu } from "./Menu/UserMenu";

export function Header() {
  const [open, setOpen] = useState(false);

  const handleOpenMenu = () => {
    setOpen(true);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  return (
    <header className={styles.root}>
      <div className={styles.container}>
        <img src="/icons/icon.svg" alt="" className={styles.logo} />

        <MenuButton onClick={handleOpenMenu} />
      </div>

      {open && <UserMenu onClose={handleCloseMenu} />}
    </header>
  );
}
