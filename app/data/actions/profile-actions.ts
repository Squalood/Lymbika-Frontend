"use server";
import { revalidatePath } from "next/cache";
import { mutateData } from "../services/mutate-data";

export async function updateProfileAction(
  userId: string,
  prevState: any,
  formData: FormData
) {
  const rawFormData = Object.fromEntries(formData);

  const payload = {
    firstName: rawFormData.firstName,
    lastName: rawFormData.lastName,
    bio: rawFormData.bio,
    mediClubRegular: rawFormData.mediClubRegular === "true", // ✅ Convierte el string en booleano
  };

  const responseData = await mutateData(
    "PUT",
    `/api/users/${userId}?populate=*`,
    payload
  );

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      message: "Failed to Update Profile.",
    };
  }

  revalidatePath("/dashboard/account");

  return {
    ...prevState,
    message: "Profile Updated",
    data: responseData,
    strapiErrors: null,
  };

}