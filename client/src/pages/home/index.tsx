import React from "react";

import { Button } from "../../ui/button";
import { HomeHero } from "../../components/homeHero";

import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <HomeHero />
    </div>
  );
}
