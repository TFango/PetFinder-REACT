import React from "react";

import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <p>Home</p>
      <Button onClick={() => navigate("/pets/nearby")}>Pets nearby</Button>
    </div>
  );
}
