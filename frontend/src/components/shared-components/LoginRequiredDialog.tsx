"use client";

import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GiPadlock } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type RoleHint = "attendee" | "organizer" | "any";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roleHint?: RoleHint;
  next?: string | null;
};

const LoginRequiredDialog = ({ open, onOpenChange, roleHint = "any", next }: Props) => {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border bg-principal border-subsidiary rounded-3xl p-0">
        <div className="p-10 rounded-t-3xl bg-subsidiary w-full flex justify-center items-center">
          <GiPadlock color="#ffffff" size={64} />
        </div>
        <div className="p-6 flex flex-col justify-center items-center gap-4 text-center">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#007CFA] from-30% to-white to-95% bg-clip-text text-transparent">
            Login Required
          </h1>
          <p className="text-text text-base md:text-lg max-w-[420px] leading-relaxed">
            You need to log in to access this feature. Choose your role to continue.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full justify-center">
            <Button
              size="lg"
              className={`${roleHint === "attendee" ? "ring-2 ring-white" : ""} bg-subsidiary`}
              onClick={() =>
                router.push(`/attendee-login${next ? `?next=${encodeURIComponent(next)}` : ""}`)
              }
            >
              Attendee Login
            </Button>
            <Button
              size="lg"
              className={`${roleHint === "organizer" ? "ring-2 ring-white" : ""} bg-subsidiary`}
              onClick={() =>
                router.push(`/organizer-login${next ? `?next=${encodeURIComponent(next)}` : ""}`)
              }
            >
              Organizer Login
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginRequiredDialog;