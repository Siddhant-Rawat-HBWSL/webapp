"use client";

import React from "react";
import Grid from "./Grid";

type Props = {
  setGridOpen: (val: boolean) => void;
};

function Box({ setGridOpen }: Props) {
  return (
    <div className="mt-16 ml-16 flex flex-col w-150 px-8 pb-8 pt-5 border border-solid border-primary-4 absolute z-[1000] top-36 bg-white">
      <div className="text-end mb-8 text-primary-6">
        <button
          className="underline text-sm font-normal"
          onClick={() => setGridOpen(false)}
        >
          Close
        </button>
      </div>

      <Grid />
    </div>
  );
}

export default Box;
