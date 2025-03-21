"use client";
import { DataTable } from "@/components";
import React, { useState } from "react";
import Columns from "./columns";
import AddMenu from "./_add/add-menu";

export default function MenuPage() {
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
            Add Menu
          </button>
        </div>
      </div>
      <DataTable
        data={[
          {
            id: 1,
            name: "Burger",
            price: 100,
            type: "chinese",
            description: "This is a burger",
            images: [],
          },
          {
            id: 2,
            name: "Pizza",
            price: 200,
            type: "korean",
            description: "This is a pizza",
            images: [],
          },
        ]}
        columns={Columns()}
      />
      <AddMenu open={openAddDialog} setOpenAddDialog={setOpenAddDialog} />
    </div>
  );
}
