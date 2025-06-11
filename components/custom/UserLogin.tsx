"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";


interface AuthUserProps {
  username: string;
  email: string;
}

export function LoggedInUser({userData,}: {readonly userData: AuthUserProps;}) {
  const pathname = usePathname();

  const textColor = pathname === "/" ? "text-background" : "text-black";

  return (
    <div className="flex gap-2">
      <Link
        href="/dashboard/account"
        className={`${textColor} hover:text-primary`}
      >
        {userData.username}
      </Link>
    </div>
  );
}