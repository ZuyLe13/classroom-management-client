import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/sign-in");
      return;
    }

    setChecking(false);
  }, [router]);

  if (checking) return null;
  
  return <>{children}</>;
}