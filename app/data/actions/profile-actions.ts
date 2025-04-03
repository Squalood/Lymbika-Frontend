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
  mediClubRegular: boolean;
}

export interface ProfileState {
  data: UserProfile | null;
  strapiErrors: StrapiErrorsProps | null; 
  message: string;
}

export async function updateProfileAction(prevState: ProfileState, formData: FormData) {
  const rawFormData = Object.fromEntries(formData);

  const userId = rawFormData.id as string;
  if (!userId) {
    return {
      ...prevState,
      strapiErrors: { message: "User ID is missing." } as StrapiErrorsProps,
      message: "Error: No user ID provided.",
    };
  }

  const payload: Partial<UserProfile> = {
    firstName: rawFormData.firstName as string,
    lastName: rawFormData.lastName as string,
    bio: rawFormData.bio as string,
    mediClubRegular: rawFormData.mediClubRegular === "true",
  };

  const responseData = await mutateData(
    "PUT",
    `/api/users/${userId}?populate=*`,
    payload
  );


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