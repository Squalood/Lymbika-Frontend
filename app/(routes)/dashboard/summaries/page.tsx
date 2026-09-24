import { getUserMeLoader } from "@/app/data/services/get-user-me-loader";
import { sessionErrorMessage } from "@/app/data/services/auth-errors";
import MemberInfo from "../components/memberInfo";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ portal?: string }>;
}) {
    // El `?portal=1` lo pone el return_url de la sesión del Customer Portal
    // (backend: src/api/subscription/controllers/subscription.ts). Se lee aquí,
    // en el servidor, para no tener que envolver una isla en <Suspense> solo
    // por useSearchParams.
    const [{ portal }, user] = await Promise.all([searchParams, getUserMeLoader()]);

    if (!user.data) {
        return (
            <p role="alert" className="mx-auto max-w-2xl px-4 py-10 text-center text-sm text-pink-700">
                {sessionErrorMessage(user.error)}
            </p>
        );
    }

    const u = user.data;
    // Misma forma que `leerFirmaDeMembresia`: el sincronizador compara contra
    // esto para saber si el webhook ya aterrizó.
    const firmaMembresia = [
        u.membershipActive,
        u.subscriptionStatus,
        u.subscriptionCancelAtPeriodEnd,
        u.subscriptionCurrentPeriodEnd,
    ].join("|");

    return(
        <MemberInfo
            user={u}
            cameFromPortal={portal === "1"}
            firmaMembresia={firmaMembresia}
        />
    );
}
