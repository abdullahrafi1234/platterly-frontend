"use client";

import { useAuth } from "@/modules/auth/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRequireRole(role: string) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== role)) {
      router.push("/login");
    }
  }, [user, loading, role, router]);

  return { user, loading };
}
