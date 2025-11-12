"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthAxios } from "@/config/auth-axios";
import { API_ROUTES } from "@/config/routes";
import { KEYS } from "@/config/constants";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type TPopupNews = {
  id: string;
  title: string | null;
  details: string | null;
  image: string | null;
  redirectUrl: string | null;
  isActive: boolean;
};

const SESSION_FLAG = "popupnews_shown";

export default function PopupNewsModal() {
  const { _axios } = useAuthAxios();
  const [open, setOpen] = useState(false);

  const { data } = useQuery<{ message: string; popup: TPopupNews | null}>({
    queryKey: KEYS.POPUP_NEWS.GET,
    queryFn: async () => {
      const res = await _axios.get(API_ROUTES.POPUP_NEWS);
      return res.data;
    },
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_FLAG)) return;
    const popup = data?.popup;
    if (popup && popup.isActive) {
      setOpen(true);
      sessionStorage.setItem(SESSION_FLAG, "1");
    }
  }, [data?.popup]);

  const popup = data?.popup;
  if (!popup) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[65vw] sm:max-w-[65vw] md:max-w-[95vw] w-[65vw] h-[92vh] md:h-[92vh] p-0 overflow-hidden">
        <div className="h-full w-full overflow-auto p-4 md:p-6 space-y-5">
          {popup.image && (
            <div className="relative w-full h-[40vh] md:h-[60vh]">
              <Image
                src={popup.image}
                alt="popup"
                fill
                className="object-cover rounded"
                sizes="(max-width: 768px) 100vw, 90vw"
                priority
              />
            </div>
          )}
          {popup.title && (
            <DialogTitle className="text-2xl md:text-3xl font-semibold text-black">
              {popup.title}
            </DialogTitle>
          )}
          {popup.details && (
            <p className="text-base md:text-lg text-black leading-relaxed">{popup.details}</p>
          )}
          <div className="flex justify-end gap-3 pt-2">
            {popup.redirectUrl && (
              <Button asChild className="btn-gold">
                <a href={popup.redirectUrl} target="_blank" rel="noreferrer">
                  Learn more
                </a>
              </Button>
            )}
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


