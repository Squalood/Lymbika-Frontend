import { getProductReviews } from "@/api/getProductReviewsServer";
import { getUserMeLoader } from "@/app/data/services/get-user-me-loader";
import { ReviewType } from "@/types/review";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Star } from "lucide-react";
import ProductReviewForm from "./product-review-form";

type Props = {
  productSlug: string;
  productId: number;
};

function Stars({ value }: { value: number }) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < Math.round(value)
              ? "fill-yellow-400 stroke-yellow-400"
              : "stroke-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

function ProductComment({ review }: { review: ReviewType }) {
  const { comment, createdAt, recommend, user } = review;

  const formattedDate = new Date(createdAt).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.username ?? "usuario anónimo";

  return (
    <div>
      <div className="w-full pb-2 my-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-col sm:w-3/5 px-4">
            <div className="flex justify-start mb-2 items-center gap-1 text-gray-400 text-sm">
              Compra verificada <CheckCircle className="w-4 h-4" />
            </div>
            <p className="text-gray-800 text-base mb-2">{comment}</p>
            <p className="text-gray-500 text-sm">{formattedDate}</p>
          </div>
          <div className="flex flex-col items-center gap-2 px-4">
            <Stars value={recommend} />
            <span className="text-lg font-semibold text-gray-800">
              {recommend.toFixed(1)}
            </span>
            <p className="text-gray-500 text-sm">{displayName}</p>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
}

export default async function ProductReviews({ productSlug, productId }: Props) {
  const [reviews, userRes] = await Promise.all([
    getProductReviews(productSlug),
    getUserMeLoader(),
  ]);

  const userId = userRes.ok ? userRes.data?.id : undefined;
  const reviewList: ReviewType[] = reviews ?? [];
  const total = reviewList.length;
  const avgRecommend =
    total > 0
      ? reviewList.reduce((acc, r) => acc + r.recommend, 0) / total
      : 0;

  return (
    <div id="reviews" className="w-full p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-1">
        Reseñas
        <span title="Basado en comentarios de clientes" className="text-gray-400 cursor-help">
          ⓘ
        </span>
      </h3>

      {total > 0 ? (
        <>
          <div className="flex items-center gap-3 mb-6">
            <Stars value={avgRecommend} />
            <span className="text-xl font-semibold text-gray-800">
              {avgRecommend.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500">({total} reseña{total !== 1 ? "s" : ""})</span>
          </div>

          <Separator />

          <div className="mt-6 space-y-2">
            {reviewList.map((review) => (
              <ProductComment key={review.id} review={review} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500 mb-4">Aún no hay reseñas para este producto.</p>
      )}

      <ProductReviewForm user={userId} productId={productId} />
    </div>
  );
}
