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
import { useState } from "react";
import StarRatingBasic from "./commerce-ui/star-rating-basic";

const ReviewForm = () => {
  const [waitingTime, setWaitingTime] = useState(3);
  const [recommend, setRecommend] = useState(3);
  const [bedsideManner, setBedsideManner] = useState(3);
  const [visitAgain, setVisitAgain] = useState(3);

  const average = (waitingTime + recommend + bedsideManner + visitAgain) / 4;

  return (
    <div className="py-4 flex justify-center">
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className="w-60 mx-auto">Crear Review</Button>
          </DialogTrigger>
          <DialogContent className="w-full sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Crear Review</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col-reverse items-center gap-6 py-4">
              <div className="grid gap-3 w-full">
                <Label htmlFor="comment">Comentario</Label>
                <Textarea id="comment" name="comment" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  <Label htmlFor="waitingTime">Tiempo de espera</Label>
                  <StarRatingBasic
                    value={waitingTime}
                    onChange={setWaitingTime}
                    maxStars={5}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Label htmlFor="recommend">Recomiendo</Label>
                  <StarRatingBasic
                    value={recommend}
                    onChange={setRecommend}
                    maxStars={5}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Label htmlFor="bedsideManner">Trato con el paciente</Label>
                  <StarRatingBasic
                    value={bedsideManner}
                    onChange={setBedsideManner}
                    maxStars={5}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Label htmlFor="visitAgain">Visitaría de nuevo</Label>
                  <StarRatingBasic
                    value={visitAgain}
                    onChange={setVisitAgain}
                    maxStars={5}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-4">
                  <Label>Promedio</Label>
                  <StarRatingBasic
                    value={average}
                    maxStars={5}
                    color="#fef08a"
                    readOnly={true}
                  />
                  <p>({average.toFixed(1)})</p>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Enviar Review</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default ReviewForm;