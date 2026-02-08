import React from "react";

import styles from "../Header.module.css";

type Props = {
  onClick: () => void;
};

export function MenuButton({ onClick }: Props) {
  return (
    <button className={styles.menuButton} onClick={onClick}>
      <img src="/icons/menu.svg" alt="" className={styles.menuIcon} />
    </button>
  );
}
