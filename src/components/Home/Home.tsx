"use client";

import React from "react";
import { useState } from "react";
import Menu from "../Menu/Menu";
import Box from "../Box/Box";

function Home() {
  const [isGridOpen, setGridOpen] = useState(false);

  return (
    <>
      {!isGridOpen ? (
        <Menu setGridOpen={setGridOpen} />
      ) : (
        <Box setGridOpen={setGridOpen} />
      )}
    </>
  );
}

export default Home;
