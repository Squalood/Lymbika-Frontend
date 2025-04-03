"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "../submit-button";
import { Textarea } from "../ui/textarea";
import { useActionState } from "react";
import { updateProfileAction } from "@/app/data/actions/profile-actions";
import { StrapiErrors } from "@/app/data/actions/strapi-errors";
import { ProfileState } from "@/app/data/actions/profile-actions";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const INITIAL_STATE: ProfileState = {
  data: null,
  strapiErrors: null,
  message: "",
};

interface ProfileFormProps {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  mediClubRegular: boolean;
}

export function ProfileForm({ data, className }: { readonly data: ProfileFormProps; readonly className?: string }) {
  const [formState, formAction] = useActionState(updateProfileAction, INITIAL_STATE);
  const [isMediClubRegular, setIsMediClubRegular] = useState(data.mediClubRegular);

  useEffect(() => {
    if (formState.message === "Profile Updated") {
      setTimeout(() => {
        toast.success("Perfil Actualizado ✅");
      }, 100); // Pequeño delay para asegurar que el render se complete
    }
  }, [formState.message]);
  

  return (
    <form className={cn("space-y-4", className)} action={formAction}>
      <input type="hidden" name="id" value={data.id} />

      <div className="space-y-4 grid">
        <div className="grid grid-cols-3 gap-4">
          <Input id="username" name="username" placeholder="Username" defaultValue={data?.username || ""} disabled />
          <Input id="email" name="email" placeholder="Email" defaultValue={data?.email || ""} disabled />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input id="firstName" name="firstName" placeholder="First Name" defaultValue={data?.firstName || ""} />
          <Input id="lastName" name="lastName" placeholder="Last Name" defaultValue={data?.lastName || ""} />
        </div>

        <Textarea
          id="bio"
          name="bio"
          placeholder="Write your bio here..."
          className="resize-none border rounded-md w-full h-[224px] p-2"
          defaultValue={data?.bio || ""}
          required
        />

        <div className="flex items-center gap-3">
          <label htmlFor="mediClubRegular" className="text-gray-700 dark:text-gray-300">
            MediClub Regular:
          </label>
          <Switch id="mediClubRegular" name="mediClubRegular" checked={isMediClubRegular} onCheckedChange={setIsMediClubRegular} />
        </div>

        <input type="hidden" name="mediClubRegular" value={isMediClubRegular.toString()} />
      </div>

      <div className="flex justify-end">
        <SubmitButton text="Update Profile" loadingText="Saving Profile" />
        <StrapiErrors error={formState?.strapiErrors} />
      </div>
    </form>
  );
}
