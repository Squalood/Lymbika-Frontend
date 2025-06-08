"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type ReviewFormState = {
  strapiErrors: any;
  message: string;
  data?: any;
};

export async function createReviewAction(
  prevState: ReviewFormState,
  formData: FormData
): Promise<ReviewFormState> {
  const comment = formData.get("comment") as string;
  const waitingTime = Number(formData.get("waitingTime"));
  const recommend = Number(formData.get("recommend"));
  const bedsideManner = Number(formData.get("bedsideManner"));
  const visitAgain = Number(formData.get("visitAgain"));
  const doctorId = Number(formData.get("doctorId"));

  const token = (await cookies()).get("jwt")?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({
        data: {
          comment,
          waitingTime,
          recommend,
          bedsideManner,
          visitAgain,
          doctor: doctorId,
        },
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      return {
        strapiErrors: json.error,
        message: json.error?.message || "Hubo un error al enviar la reseña.",
      };
    }

    revalidatePath("/doctor-catalog");

    return {
      data: json,
      strapiErrors: null,
      message: "Reseña creada exitosamente.",
    };
  } catch (error) {
    return {
      strapiErrors: true,
      message:
        error instanceof Error
          ? error.message
          : "Hubo un error inesperado.",
    };
  }
}
