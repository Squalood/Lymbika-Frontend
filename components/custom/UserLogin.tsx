"use client"

interface AuthUserProps {
  username: string;
  email: string;
}

export function LoggedInUser({userData,}: {readonly userData: AuthUserProps;}) {

  return (
    <div className="flex gap-2">
        {userData.username}
    </div>
  );
}