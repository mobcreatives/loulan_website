"use client";

import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button, PageTitle, ItemFormDrawer } from "@/components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { KEYS } from "@/config/constants";
import { API_ROUTES } from "@/config/routes";
import { useAuthAxios } from "@/config/auth-axios";
import { TPopupNews } from "./types";
import Image from "next/image";

export default function PopupProducts() {
  const { _axios } = useAuthAxios();
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [currentPopup, setCurrentPopup] = useState<TPopupNews | null>(null);

  const { data } = useQuery<{ message: string; popup: TPopupNews | null }>({
    queryKey: KEYS.POPUP_NEWS.GET,
    queryFn: async () => {
      const res = await _axios.get(API_ROUTES.POPUP_NEWS);
      return res.data;
    },
  });

  const { mutateAsync: savePopup } = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await _axios.patch(API_ROUTES.POPUP_NEWS, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      toast("Popup news saved.");
      queryClient.invalidateQueries({ queryKey: KEYS.POPUP_NEWS.GET });
      setIsFormOpen(false);
    },
  });

  const handleAdd = () => {
    setCurrentPopup(data?.popup ?? null);
    setIsFormOpen(true);
  };

  return (
    <div>
      <PageTitle
        title="Popup Products"
        description="Manage special promotions and limited-time menu items"
        actions={
          <Button onClick={handleAdd} className="btn-gold cursor-pointer">
            <Plus size={16} />
            Add Popup Product
          </Button>
        }
      />

      <div className="mt-6">
        {data?.popup ? (
          <div className="space-y-2">
            <div className="text-lg font-semibold">{data.popup.title}</div>
            <div className="text-sm text-muted-foreground">{data.popup.details}</div>
            <div className="text-sm">Redirect: {data.popup.redirectUrl ?? "—"}</div>
            <div className="text-sm">Active: {data.popup.isActive ? "Yes" : "No"}</div>
            {data.popup.image && (
              <Image
                src={data.popup.image}
                alt="popup"
                width={256}
                height={144}
                className="w-64 h-36 object-cover rounded"
              />
            )}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">No popup news configured yet.</div>
        )}
      </div>

      <ItemFormDrawer
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={currentPopup ? "Edit Popup News" : "Create Popup News"}
        description="Manage the popup announcement shown to users"
        onSubmit={async () => {
          const form = new FormData();
          const title = (document.getElementById("title") as HTMLInputElement)?.value;
          const details = (document.getElementById("details") as HTMLTextAreaElement)?.value;
          const redirectUrl = (document.getElementById("redirectUrl") as HTMLInputElement)?.value;
          const isActive = (document.getElementById("isActive") as HTMLInputElement)?.checked;
          if (title) form.append("title", title);
          if (details) form.append("details", details);
          if (redirectUrl) form.append("redirectUrl", redirectUrl);
          form.append("isActive", String(isActive));
          const file = fileRef.current?.files?.[0];
          if (file) form.append("image", file);
          await savePopup(form);
        }}
        submitLabel={currentPopup ? "Save Changes" : "Save"}
      >
        <div className="space-y-4 py-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <input
                id="title"
                type="text"
                className="w-full p-2 border rounded-md gold-focus-ring"
                defaultValue={currentPopup?.title ?? ""}
                placeholder="Enter popup title"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="details" className="text-sm font-medium">
                Details
              </label>
              <textarea
                id="details"
                className="w-full p-2 border rounded-md gold-focus-ring min-h-[100px]"
                defaultValue={currentPopup?.details ?? ""}
                placeholder="Describe the popup"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="redirectUrl" className="text-sm font-medium">
                Redirect URL
              </label>
              <input
                id="redirectUrl"
                type="text"
                className="w-full p-2 border rounded-md gold-focus-ring"
                defaultValue={currentPopup?.redirectUrl ?? ""}
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="imageFile" className="text-sm font-medium">
                Image
              </label>
              <input id="imageFile" ref={fileRef} type="file" accept="image/*" className="w-full" />
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="isActive"
                type="checkbox"
                className="gold-focus-ring rounded"
                defaultChecked={currentPopup ? currentPopup.isActive : true}
              />
              <label htmlFor="isActive" className="text-sm font-medium">
                Active
              </label>
            </div>
          </div>
        </div>
      </ItemFormDrawer>
    </div>
  );
}
