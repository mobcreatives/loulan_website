"use client";

import { DataTable } from "@/components";
import React, { useState } from "react";
import Columns from "../columns";
import AddCuisine from "../_add/add-cuisine";
import { CuisineType } from "@prisma/client";
export default function CuisineTable({
  data,
}: Readonly<{ data: CuisineType[] }>) {
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  return (
    <div className="relative bg-[#3d3d3d] rounded-[12px] shadow-[0px_0px_4px_0px] shadow-primary">
      <div className="px-3 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-medium text-primary font-fredoka">Menu</h1>
        <div className="">
          <button
            type="button"
            className="text-[#60697B] bg-primary py-2 px-3 rounded-[8px] cursor-pointer font-medium font-fredoka"
            onClick={() => setOpenAddDialog(true)}
          >
            Add Cuisine
          </button>
        </div>
      </div>
      <DataTable data={data ?? []} columns={Columns()} />
      <AddCuisine open={openAddDialog} setOpen={setOpenAddDialog} />
    </div>
  );
}
