"use client";

import React from "react";
import Image from "next/image";
import arrowDown from "../../../public/arrow-down.png";

type Props = {
  setGridOpen: (val: boolean) => void;
};

function Menu({ setGridOpen }: Props) {
  return (
    <div className="absolute z-[1000] top-36">
      <button
        className="bg-secondary-2 w-32 relative rotate-270 mt-32 -ml-11 flex items-center justify-around"
        onClick={() => setGridOpen(true)}
      >
        <p className="text-white text-base font-bold my-2">Menu</p>
        <Image src={arrowDown} alt="arrow-down" className="rotate-90" />
      </button>
    </div>
  );
}

export default Menu;
