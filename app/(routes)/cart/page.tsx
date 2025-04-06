import { getUserMeLoader } from "@/app/data/services/get-user-me-loader";
import CartClientPage from "./components/cart-client";

export default async function CartPageWrapper() {
  const userData = await getUserMeLoader();
  const user = userData.ok ? userData.data : null;

  return <CartClientPage user={user} />;
}
