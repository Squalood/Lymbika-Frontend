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
  message: string | null;
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

  const responseData: { data?: UserProfile; error?: StrapiErrorsProps } = await mutateData(
    "PUT",
    `/api/users/${userId}?populate=*`,
    payload
  );

  if (!responseData?.data) {
    return {
      ...prevState,
      strapiErrors: responseData?.error || null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  // ✅ Aseguramos la revalidación de la caché
  revalidatePath("/dashboard/account");

  return {
    ...prevState,
    message: "Profile Updated",
    data: responseData.data,
    strapiErrors: null,
  };
}