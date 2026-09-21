"use server";
import { revalidatePath } from "next/cache";
import { mutateData } from "../services/mutate-data";
import { StrapiErrorsProps } from "./strapi-errors";

interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
}

export interface ProfileState {
  data: UserProfile | null;
  strapiErrors: StrapiErrorsProps | null; 
  message: string;
}

export async function updateProfileAction(prevState: ProfileState, formData: FormData) {
  const rawFormData = Object.fromEntries(formData);

  // Solo estos tres campos cruzan. El usuario lo resuelve el backend desde el
  // token: no se manda ningun id, y membershipActive no es editable por nadie
  // desde aqui — lo pone el flujo de membresia.
  const payload: Partial<UserProfile> = {
    firstName: rawFormData.firstName as string,
    lastName: rawFormData.lastName as string,
    bio: rawFormData.bio as string,
  };

  const responseData = await mutateData("PUT", "/api/profile", payload);

  if (responseData?.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error as StrapiErrorsProps,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  // ✅ Ajustar la forma en que se extraen los datos
  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: { message: "No data received from API." } as StrapiErrorsProps,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  // ✅ Asignar directamente los datos del usuario sin `data`
  revalidatePath("/dashboard/account");

  return {
    ...prevState,
    message: "Profile Updated",
    data: responseData, // Ahora sí contiene los datos correctos
    strapiErrors: null,
  };
}