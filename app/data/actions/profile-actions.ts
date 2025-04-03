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

export async function updateProfileAction(
  prevState: ProfileState, 
  formData: FormData
) {
  try {
    const userId = formData.get("id") as string;

    const rawFormData = Object.fromEntries(formData);
    const payload: Partial<UserProfile> = {
      firstName: rawFormData.firstName as string,
      lastName: rawFormData.lastName as string,
      bio: rawFormData.bio as string,
      mediClubRegular: rawFormData.mediClubRegular === "true",
    };

    if (!payload.firstName && !payload.lastName && !payload.bio && payload.mediClubRegular === undefined) {
      return {
        ...prevState,
        message: "No changes detected.",
        strapiErrors: null, // ✅ Evita que devuelva un tipo incorrecto
      };
    }

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

    revalidatePath("/dashboard/account");

    return {
      ...prevState,
      message: "Profile Updated",
      data: responseData.data, 
      strapiErrors: null,
    };
  } catch (error) {
    console.error("Error updating profile:", error);

    return {
      ...prevState,
      message: "Unexpected error occurred.",
      strapiErrors: { message: "An unexpected error occurred. Please try again later." } as StrapiErrorsProps,
    };
  }
}
