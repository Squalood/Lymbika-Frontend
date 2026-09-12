import { AuthUserProps } from "./types";

/**
 * Costo de envío que se muestra en el carrito.
 *
 * Es solo una previsualización: quien cobra es el backend, que usa su propia
 * DELIVERY_COST_MXN. Si las dos variables divergen, manda la del backend — hay
 * que moverlas juntas.
 */
export const DELIVERY_COST = Number(
  process.env.NEXT_PUBLIC_DELIVERY_COST ?? 200
);

type PrecioDeItem = {
  price: number;
  priceMember: number;
};

/**
 * Precio que se le muestra al usuario. El precio que realmente se cobra lo
 * decide el servidor leyendo `mediClubRegular` del usuario autenticado.
 */
export const getItemPrice = (
  item: PrecioDeItem,
  user: AuthUserProps | null
): number => {
  const useMemberPrice = user?.mediClubRegular && item.priceMember > 0;
  return useMemberPrice ? item.priceMember : item.price;
};
