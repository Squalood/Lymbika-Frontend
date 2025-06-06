import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import DoctorComment from "./doctor-Comment";
import { ReviewType } from "@/types/review";
import ReviewForm from "@/components/reviewForm";

type Props = {
  reviews: ReviewType[];
};

const DoctorReviews = ({ reviews }: Props) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="w-full p-6">
        <h3 className="text-lg font-semibold mb-4">Patient reviews</h3>
        <p>No hay reseñas aún para este doctor.</p>
      </div>
    );
  }

  // Calcular promedios
  const total = reviews.length;
  const sum = reviews.reduce(
    (acc, review) => {
      acc.waitingTime += review.waitingTime;
      acc.recommend += review.recommend;
      acc.bedsideManner += review.bedsideManner;
      acc.visitAgain += review.visitAgain;
      return acc;
    },
    { waitingTime: 0, recommend: 0, bedsideManner: 0, visitAgain: 0 }
  );

  const avgWaitingTime = sum.waitingTime / total;
  const avgRecommend = sum.recommend / total;
  const avgBedside = sum.bedsideManner / total;
  const avgVisitAgain = sum.visitAgain / total;

  const avgTotal = (avgWaitingTime + avgRecommend + avgBedside + avgVisitAgain) / 4;

  const stars = Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-5 h-5 ${
        i < Math.round(avgTotal) ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"
      }`}
    />
  ));

  return (
    <div className="w-full p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-1">
        Patient reviews
        <span title="Basado en comentarios de pacientes" className="text-gray-400 cursor-help">ⓘ</span>
      </h3>

      <div className="flex flex-col sm:flex-row justify-between">
        {/* Overall */}
        <div className="flex flex-col items-start gap-2 mb-6 sm:mb-0">
          <p className="text-sm text-gray-600">Overall satisfaction</p>
          <div className="flex items-center gap-2">
            <div className="flex">{stars}</div>
            <span className="text-xl font-semibold text-gray-800">{avgTotal.toFixed(1)}</span>
            
          </div>
        </div>

        {/* Detail per category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm text-gray-700">
          <ReviewRow label="Waiting time" value={avgWaitingTime} />
          <ReviewRow label="Would recommend" value={avgRecommend} />
          <ReviewRow label="Bedside manner" value={avgBedside} />
          <ReviewRow label="Would visit again" value={avgVisitAgain} />
        </div>
      </div>
      <div className="mt-8">
        <Separator />
      </div>

      <div className="mt-6 space-y-8">
        {reviews.map((review) => (
          <DoctorComment key={review.id} review={review} />
        ))}
      </div>
      <ReviewForm/>
    </div>
  );
};

const ReviewRow = ({ label, value }: { label: string; value: number }) => (
  <div className="flex justify-between pr-4">
    <span>{label}</span>
    <strong className="text-gray-900">{value.toFixed(1)}</strong>
  </div>
);

export default DoctorReviews;