import { getUserMeLoader } from "@/app/data/services/get-user-me-loader";
import MemberInfo from "../components/memberInfo";

export default async function Page() {
    const user = await getUserMeLoader();

    return(  
        <MemberInfo user={user.data}/>
    );
}