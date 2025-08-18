import { useRouter } from "next/navigation";
import { useState, useEffect, ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
  roleAllowed: string[];
};

export default function ProtectedRoute({ children, roleAllowed }: ProtectedRouteProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    if (!user) {
      router.replace("/sign-in");
      return;
    }

    if (!roleAllowed.includes(user.role)) {
      router.replace("/manage-lessons");
      return;
    }

    setAuthorized(true);
  }, [router, roleAllowed]);

  if (!authorized) return null;

  return <>{children}</>;
}