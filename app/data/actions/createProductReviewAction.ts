"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { StrapiErrorsProps } from "./strapi-errors";
import { ReviewType } from "@/types/review";

type ReviewFormState = {
  strapiErrors: StrapiErrorsProps | null;
  message: string;
  data?: ReviewType | null;
};

export async function createProductReviewAction(
  prevState: ReviewFormState,
  formData: FormData
): Promise<ReviewFormState> {
  const comment = formData.get("comment") as string;
  const recommend = Number(formData.get("recommend"));
  const productId = Number(formData.get("productId"));

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
          recommend,
          product: productId,
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

    revalidatePath(`/product`);

    return {
      data: json,
      strapiErrors: null,
      message: "Reseña creada exitosamente.",
    };
  } catch (error) {
    return {
      strapiErrors: { message: "No data received from API." } as StrapiErrorsProps,
      message:
        error instanceof Error
          ? error.message
          : "Hubo un error inesperado.",
    };
  }
}
