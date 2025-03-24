"use client";
import { DataTable } from "@/components";
import React, { useState } from "react";
import Columns from "./columns";
import AddMenu from "./_add/add-menu";
import { useQuery } from "@tanstack/react-query";
import { getMenu } from "./helper";
import { KEYS } from "@/config/constants";

export default function MenuPage() {
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const { data: menus } = useQuery({
    queryKey: KEYS.MENU.GET,
    queryFn: getMenu,
  });
  return (
    <div className="relative bg-[#3d3d3d] rounded-[12px] shadow-[0px_0px_4px_0px] shadow-primary">
      <div className="px-3 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-medium text-primary font-fredoka">
          Menu List
        </h1>
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
      <DataTable data={menus ?? []} columns={Columns()} />
      <AddMenu open={openAddDialog} setOpen={setOpenAddDialog} />
    </div>
  );
}
