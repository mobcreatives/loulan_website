"use client";

import React, { useState } from "react";
import { KEYS } from "@/config/constants";
import { useQuery } from "@tanstack/react-query";
import { getFood } from "./helper";
import Columns from "./column";
import { DataTable } from "@/components";
import AddFood from "./_add/add-food";

export default function Food() {
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const { data: food } = useQuery({
    queryKey: KEYS.FOOD.GET,
    queryFn: getFood,
  });
  return (
    <div className="relative bg-[#3d3d3d] rounded-[12px] shadow-[0px_0px_4px_0px] shadow-primary">
      <div className="px-3 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-medium text-primary font-fredoka">
          Food List
        </h1>
        <div className="">
          <button
            type="button"
            className="text-[#60697B] bg-primary py-2 px-3 rounded-[8px] cursor-pointer font-medium font-fredoka"
            onClick={() => setOpenAddDialog(true)}
          >
            Add Food
          </button>
        </div>
      </div>
      <DataTable data={food ?? []} columns={Columns()} />
      <AddFood open={openAddDialog} setOpen={setOpenAddDialog} />
    </div>
  );
}
