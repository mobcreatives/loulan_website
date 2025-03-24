"use client";
import { useQuery } from "@tanstack/react-query";
import { getCuisines } from "./helper";
import { useState } from "react";
import { DataTable } from "@/components";
import AddCuisine from "./_add/add-cuisine";
import Columns from "./columns";
import { KEYS } from "@/config/constants";

export default function Cuisine() {
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const { data: cuisine } = useQuery({
    queryFn: getCuisines,
    queryKey: KEYS.CUISINE.GET,
  });
  return (
    <div className="relative bg-[#3d3d3d] rounded-[12px] shadow-[0px_0px_4px_0px] shadow-primary">
      <div className="px-3 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-medium text-primary font-fredoka">
          Cuisine List
        </h1>
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
      <DataTable data={cuisine ?? []} columns={Columns()} />
      <AddCuisine open={openAddDialog} setOpen={setOpenAddDialog} />
    </div>
  );
}
