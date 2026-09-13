import { getUserMeLoader } from "@/app/data/services/get-user-me-loader";
import MemberInfo from "../components/memberInfo";

export default async function Page() {
    const user = await getUserMeLoader();

    if (!user.data) {
        return (
            <p role="alert" className="mx-auto max-w-2xl px-4 py-10 text-center text-sm text-pink-700">
                No pudimos cargar tu membresía. Vuelve a iniciar sesión e inténtalo de nuevo.
            </p>
        );
    }

    return(  
        <MemberInfo user={user.data}/>
    );
}