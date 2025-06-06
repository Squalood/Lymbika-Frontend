import { ReviewType } from "@/types/review";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Star } from "lucide-react";

type Props = {
  review: ReviewType;
};

const DoctorComment = ({ review }: Props) => {
  const { comment, createdAt, waitingTime, recommend, bedsideManner, visitAgain, User } = review;

  const average = (waitingTime + recommend + bedsideManner + visitAgain) / 4;

  const stars = Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-5 h-5 ${
        i < Math.round(average) ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"
      }`}
    />
  ));

  const ReviewRow = ({ label, value }: { label: string; value: number }) => (
    <div className="flex justify-between pr-4">
      <span className="mr-2">{label}</span>
      <strong className="text-gray-900">{value.toFixed(1)}</strong>
    </div>
  );

  const formattedDate = new Date(createdAt).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <div className="w-full pb-2 my-6">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex flex-col sm:w-3/5 px-4">
            <div className="flex justify-start mb-2 items-center gap-1 text-gray-400 text-sm">
              Verified patient <CheckCircle className="w-4 h-4" />
            </div>
            <p className="text-gray-800 text-base mb-2">{comment}</p>
            <p className="text-gray-500 text-sm">{formattedDate}</p>
          </div>
          <div className="flex flex-col sm:flex-row my-2 justify-end items-center">
            <div className="flex flex-col text-sm text-gray-700">
              <ReviewRow label="Waiting time" value={waitingTime} />
              <ReviewRow label="Would recommend" value={recommend} />
              <ReviewRow label="Bedside manner" value={bedsideManner} />
              <ReviewRow label="Would visit again" value={visitAgain} />
            </div>
            <div className="flex flex-col items-center gap-2 mb-6 sm:mb-0">
              <p className="text-sm text-gray-600">Overall satisfaction</p>
              <div className="flex items-center gap-2">
                <div className="flex">{stars}</div>
                <span className="text-xl font-semibold text-gray-800">{average.toFixed(1)}</span>
              </div>
              <p className="text-gray-500 text-sm">
                
                {User?.firstName && User?.lastName
                  ? `${User.firstName} ${User.lastName}`
                  : "usuario anónimo"}
              </p>

            </div>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default DoctorComment;