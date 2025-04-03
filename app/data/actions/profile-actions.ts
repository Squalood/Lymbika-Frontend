"use server";
import { revalidatePath } from "next/cache";
import { mutateData } from "../services/mutate-data";

interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  mediClubRegular: boolean;
}

interface ProfileState {
  data: UserProfile | null;
  strapiErrors: string | null; 
  message: string | null;
}

export async function updateProfileAction(
  userId: string,
  prevState: ProfileState, 
  formData: FormData
) {
  const rawFormData = Object.fromEntries(formData);

  const payload: Partial<UserProfile> = {
    firstName: rawFormData.firstName as string,
    lastName: rawFormData.lastName as string,
    bio: rawFormData.bio as string,
    mediClubRegular: rawFormData.mediClubRegular === "true",
  };

  const responseData: { data?: UserProfile; error?: any } = await mutateData(
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
}
