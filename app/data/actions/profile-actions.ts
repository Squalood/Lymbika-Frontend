"use server";
import { revalidatePath } from "next/cache";
import { mutateData } from "../services/mutate-data";

// Definimos un tipo para el estado del formulario
interface ProfileState {
  data: any | null; // Puedes mejorar esto con el tipo adecuado
  strapiErrors: any | null;
  message: string | null;
}

export async function updateProfileAction(
  userId: string,
  prevState: ProfileState, // ✅ Usamos el tipo en lugar de "any"
  formData: FormData
) {
  const rawFormData = Object.fromEntries(formData);

  const payload = {
    firstName: rawFormData.firstName as string,
    lastName: rawFormData.lastName as string,
    bio: rawFormData.bio as string,
    mediClubRegular: rawFormData.mediClubRegular === "true", // ✅ Asegura que sea un booleano
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