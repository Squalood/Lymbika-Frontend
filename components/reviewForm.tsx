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
import StarRatingBasic from "./commerce-ui/star-rating-basic";
import { useActionState } from "react";
import { toast } from "sonner";
import { createReviewAction } from "@/app/data/actions/createReviewAction";
import { SubmitButton } from "./submit-button";

const INITIAL_STATE = {
  data: null,
  strapiErrors: null,
  message: "",
};

export function ReviewForm({
  user,
  doctor,
  compact = false,
  doctorSlug,
}: {
  user?: number;
  doctor: number;
  compact?: boolean;
  doctorSlug?: string;
}) {
  const [formState, formAction] = useActionState(createReviewAction, INITIAL_STATE);

  const [waitingTime, setWaitingTime] = useState(3);
  const [recommend, setRecommend] = useState(3);
  const [bedsideManner, setBedsideManner] = useState(3);
  const [visitAgain, setVisitAgain] = useState(3);
  const [comment, setComment] = useState("");

  const [open, setOpen] = useState(false); // ✅ controlar apertura del modal
  const formRef = useRef<HTMLFormElement>(null);

  const average = (waitingTime + recommend + bedsideManner + visitAgain) / 4;

  useEffect(() => {
    if (formState.message === "Reseña creada exitosamente.") {
      toast.success("Gracias por tu review 🙌");

      // Resetear formulario
      formRef.current?.reset();
      setComment("");
      setWaitingTime(3);
      setRecommend(3);
      setBedsideManner(3);
      setVisitAgain(3);

      // ✅ Cerrar modal
      setOpen(false);

      setTimeout(() => {
        // Si es modo compact y hay slug, redirigir a la página del doctor con anchor a reviews
        if (compact && doctorSlug) {
          window.location.href = `/doctor/${doctorSlug}#reviews`;
        } else {
          window.location.reload();
        }
      }, 300);

    } else if (formState.strapiErrors) {
      toast.error(formState.message || "Hubo un problema al enviar tu review.");
    }
  }, [formState, compact, doctorSlug]);

  return (
    <div className={compact ? "" : "py-4 flex justify-center"}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className={compact ? "" : "w-60 mx-auto"}
            variant={compact ? "link" : "default"}
            onClick={(e) => {
              if (!user) {
                e.preventDefault();
                toast.error("Debes iniciar sesión para dejar una reseña.");
                return;
              }
              setOpen(true);
            }}
          >
            Crear Review
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full sm:max-w-[425px]">
          <form ref={formRef} action={formAction}>
            <DialogHeader>
              <DialogTitle>Crear Review</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col-reverse items-center gap-6 py-4">
              <div className="grid gap-3 w-full">
                <Label htmlFor="comment">Comentario</Label>
                <Textarea
                  id="comment"
                  name="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  <Label htmlFor="waitingTime">Tiempo de espera</Label>
                  <StarRatingBasic value={waitingTime} onChange={setWaitingTime} maxStars={5} />
                </div>
                <div className="flex flex-col gap-4">
                  <Label htmlFor="recommend">¿Lo recomendaría?</Label>
                  <StarRatingBasic value={recommend} onChange={setRecommend} maxStars={5} />
                </div>
                <div className="flex flex-col gap-4">
                  <Label htmlFor="bedsideManner">Trato con el paciente</Label>
                  <StarRatingBasic value={bedsideManner} onChange={setBedsideManner} maxStars={5} />
                </div>
                <div className="flex flex-col gap-4">
                  <Label htmlFor="visitAgain">¿Visitaría de nuevo?</Label>
                  <StarRatingBasic value={visitAgain} onChange={setVisitAgain} maxStars={5} />
                </div>
              </div>

              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-4">
                  <Label>Promedio</Label>
                  <StarRatingBasic value={average} maxStars={5} color="#fef08a" readOnly />
                  <p>({average.toFixed(1)})</p>
                </div>
              </div>
            </div>

            {/* Campos ocultos que se envían con el formulario */}
            <input type="hidden" name="doctorId" value={doctor.toString()} />
            <input type="hidden" name="waitingTime" value={waitingTime.toString()} />
            <input type="hidden" name="recommend" value={recommend.toString()} />
            <input type="hidden" name="bedsideManner" value={bedsideManner.toString()} />
            <input type="hidden" name="visitAgain" value={visitAgain.toString()} />
            <input type="hidden" name="userID" value={user?.toString()} />

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancelar
                </Button>
              </DialogClose>
              <SubmitButton text={"Enviar Reseña"} loadingText={"Enviando Reseña"} />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ReviewForm;