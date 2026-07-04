"use client";

import Loader from "@/components/shared/Loader";
import { useRequireRole } from "@/hooks/useRequireRole";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/provider/dashboard", label: "Dashboard" },
  { href: "/provider/menu", label: "Menu" },
  { href: "/provider/orders", label: "Orders" },
];

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useRequireRole("PROVIDER");
  const pathname = usePathname();

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8 flex gap-8">
      <aside className="w-48 shrink-0">
        <nav className="flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                pathname === link.href ? "bg-ink text-cream" : "hover:bg-ink/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}
