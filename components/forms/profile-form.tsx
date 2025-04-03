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
import { useRouter } from "next/navigation";

// ✅ Definir el estado inicial con el tipo correcto
const INITIAL_STATE: ProfileState = {
  data: null,
  strapiErrors: null, 
  message: null,
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

export function ProfileForm({
  data,
  className,
}: {
  readonly data: ProfileFormProps;
  readonly className?: string;
}) {
  const [formState, formAction] = useActionState(updateProfileAction, INITIAL_STATE);
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [bio, setBio] = useState(data.bio);
  const [isMediClubRegular, setIsMediClubRegular] = React.useState(data.mediClubRegular);

  // 🔄 Actualiza los estados cuando formState.data cambia
  useEffect(() => {
    if (formState.data) {
      setFirstName(formState.data.firstName);
      setLastName(formState.data.lastName);
      setBio(formState.data.bio);
      setIsMediClubRegular(formState.data.mediClubRegular);
    }
  }, [formState.data]);

  return (
    <form className={cn("space-y-4", className)} action={formAction}>
    <input type="hidden" name="id" value={data.id} />  {/* ✅ Agregamos el ID aquí */}
    
    <div className="space-y-4 grid">
      <div className="grid grid-cols-3 gap-4">
        <Input id="username" name="username" placeholder="Username" defaultValue={data?.username || ""} disabled />
        <Input id="email" name="email" placeholder="Email" defaultValue={data?.email || ""} disabled />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input id="firstName" name="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <Input id="lastName" name="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>

      <Textarea
        id="bio"
        name="bio"
        placeholder="Write your bio here..."
        className="resize-none border rounded-md w-full h-[224px] p-2"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        required
      />

      <div className="flex items-center gap-3">
        <label htmlFor="mediClubRegular" className="text-gray-700 dark:text-gray-300">
          MediClub Regular:
        </label>
        <Switch
          id="mediClubRegular"
          name="mediClubRegular"
          checked={isMediClubRegular}
          onCheckedChange={setIsMediClubRegular}
        />
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
