"use client";
import Loader from "@/components/shared/Loader";
import { useRequireRole } from "@/hooks/useRequireRole";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useRequireRole("CUSTOMER");

  if (loading) return <Loader></Loader>;

  return <>{children}</>;
}
