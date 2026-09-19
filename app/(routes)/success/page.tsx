import { SuccessClient } from "./components/success-client";

/**
 * El `session_id` lo pone Stripe en el success_url del checkout
 * (backend-ecommerce/src/api/order/controllers/order.ts).
 *
 * Llegar a esta página NO prueba que el pago se haya cobrado: es solo una
 * redirección del navegador. Quien confirma es el webhook, así que aquí se
 * consulta el estado real de la orden antes de decir nada.
 */
export default async function PageSuccess({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  return <SuccessClient sessionId={session_id} />;
}
