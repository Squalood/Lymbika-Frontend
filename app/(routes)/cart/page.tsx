import { Suspense } from "react";
import { getUserMeLoader } from "@/app/data/services/get-user-me-loader";
import CartClientPage from "./components/cart-client";
import CartSkeleton from "@/components/skeleton/CartSkeleton";

// Componente asíncrono que carga los datos del usuario
async function CartWithData() {
  const userData = await getUserMeLoader();
  const user = userData.ok ? userData.data : null;

  return <CartClientPage user={user} />;
}

// Page principal con Suspense
export default function CartPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <Suspense fallback={<CartSkeleton />}>
        <CartWithData />
      </Suspense>
    </div>
  );
}