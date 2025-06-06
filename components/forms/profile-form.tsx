"use client";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "../submit-button";
import { Textarea } from "../ui/textarea";
import { useActionState } from "react";
import { updateProfileAction } from "@/app/data/actions/profile-actions";
import { StrapiErrors } from "@/app/data/actions/strapi-errors";
import { ProfileState } from "@/app/data/actions/profile-actions";
import { toast } from "sonner";
import { UserType } from "@/types/user";

const INITIAL_STATE: ProfileState = {
  data: null,
  strapiErrors: null,
  message: "",
};

export function ProfileForm({ data, className }: { readonly data: UserType; readonly className?: string }) {
  const [formState, formAction] = useActionState(updateProfileAction, INITIAL_STATE);

  useEffect(() => {
    if (formState.message === "Profile Updated") {
      setTimeout(() => {
        toast.success("Perfil Actualizado ✅");
      }, 100);
    }
  }, [formState.message]);

  return (
    <form className={cn("space-y-4", className)} action={formAction}>
      <input type="hidden" name="id" value={data.id.toString()} />

      <div className="space-y-4 grid">
        <div className="grid grid-cols-3 gap-4">
          <Input id="username" name="username" placeholder="Username" defaultValue={data.username} disabled />
          <Input id="email" name="email" placeholder="Email" defaultValue={data.email} disabled />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input id="firstName" name="firstName" placeholder="First Name" defaultValue={data.firstName || ""} />
          <Input id="lastName" name="lastName" placeholder="Last Name" defaultValue={data.lastName || ""} />
        </div>

        <Textarea
          id="bio"
          name="bio"
          placeholder="Write your bio here..."
          className="resize-none border rounded-md w-full h-[224px] p-2"
          defaultValue={data.bio || ""}
          required
        />
      </div>

      <div className="flex justify-end">
        <SubmitButton text="Update Profile" loadingText="Saving Profile" />
        <StrapiErrors error={formState?.strapiErrors} />
      </div>
    </form>
  );
}