"use client";

import React from "react";
import { useState } from "react";
import UnassignedItems from "./UnassignedItems";
import MyItems from "./MyItems";

function Grid() {
  const [isMyItemsOpen, setMyItemsOpen] = useState(false);

  return (
    <>
      <div className="w-full border border-solid border-primary-2 mb-3">
        <button
          className={`w-1/2 p-4 text-base font-medium ${
            isMyItemsOpen
              ? "bg-primary-0 border border-solid border-b-secondary-1 text-secondary-1 font-semibold"
              : "text-primary-7 "
          }`}
          onClick={() => setMyItemsOpen(true)}
        >
          My Items
        </button>
        <button
          className={`w-1/2 p-4 text-base font-medium ${
            isMyItemsOpen
              ? "text-primary-7 "
              : "bg-primary-0 border border-solid border-b-secondary-1 text-secondary-1 font-semibold"
          }`}
          onClick={() => setMyItemsOpen(false)}
        >
          All unassigned Items
        </button>
      </div>

      {isMyItemsOpen ? <MyItems /> : <UnassignedItems />}
    </>
  );
}

export default Grid;
