"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/modules/auth/authContext";
import { useCart } from "@/modules/order/cartContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="border-b sticky top-0 bg-background z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold">
          Platterly
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/meals">Meals</Link>

          {!loading && !user && (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}

          {!loading && user && (
            <>
              {user.role === "CUSTOMER" && (
                <>
                  <Link href="/cart" className="relative">
                    <ShoppingCart size={20} />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-chili text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                  <Link href="/orders">My Orders</Link>
                  <Link href="/profile">Profile</Link>
                </>
              )}
              {user.role === "PROVIDER" && (
                <Link href="/provider/dashboard">Dashboard</Link>
              )}
              {user.role === "ADMIN" && <Link href="/admin">Admin</Link>}
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
