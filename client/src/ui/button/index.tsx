import React, { type ReactNode } from "react";

type Props = {
  onClick?: () => void;
  children: ReactNode;
};

export function Button({ onClick, children }: Props) {
  return <button onClick={onClick}>{children}</button>;
}
