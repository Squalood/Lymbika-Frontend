"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import StarRatingBasic from "@/components/commerce-ui/star-rating-basic";
import { useActionState } from "react";
import { toast } from "sonner";
import { createProductReviewAction } from "@/app/data/actions/createProductReviewAction";
import { SubmitButton } from "@/components/submit-button";

const INITIAL_STATE = {
  data: null,
  strapiErrors: null,
  message: "",
};

export function ProductReviewForm({
  user,
  productId,
}: {
  user?: number;
  productId: number;
}) {
  const [formState, formAction] = useActionState(createProductReviewAction, INITIAL_STATE);
  const [recommend, setRecommend] = useState(5);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.message === "Reseña creada exitosamente.") {
      toast.success("Gracias por tu reseña");
      formRef.current?.reset();
      setComment("");
      setRecommend(5);
      setOpen(false);
      setTimeout(() => window.location.reload(), 300);
    } else if (formState.strapiErrors) {
      toast.error(formState.message || "Hubo un problema al enviar tu reseña.");
    }
  }, [formState]);

  return (
    <div className="py-4 flex justify-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="w-60 mx-auto"
            onClick={(e) => {
              if (!user) {
                e.preventDefault();
                toast.error("Debes iniciar sesión para dejar una reseña.");
                return;
              }
              setOpen(true);
            }}
          >
            Escribir una reseña
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full sm:max-w-[425px]">
          <form ref={formRef} action={formAction}>
            <DialogHeader>
              <DialogTitle>Escribir una reseña</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col items-center gap-6 py-4">
              <div className="flex flex-col items-center gap-3">
                <Label>Calificación</Label>
                <StarRatingBasic value={recommend} onChange={setRecommend} maxStars={5} />
                <p className="text-sm text-gray-500">({recommend} / 5)</p>
              </div>

              <div className="grid gap-3 w-full">
                <Label htmlFor="comment">Comentario</Label>
                <Textarea
                  id="comment"
                  name="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Cuéntanos tu experiencia con este producto..."
                  required
                />
              </div>
            </div>

            <input type="hidden" name="productId" value={productId.toString()} />
            <input type="hidden" name="recommend" value={recommend.toString()} />

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancelar
                </Button>
              </DialogClose>
              <SubmitButton text="Enviar Reseña" loadingText="Enviando..." />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductReviewForm;
