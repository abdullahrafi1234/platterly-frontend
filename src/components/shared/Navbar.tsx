"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/modules/auth/authContext";
import { useCart } from "@/modules/order/cartContext";
import { Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [open, setOpen] = useState(false);

  const NavLinks = () => (
    <>
      <Link href="/meals" onClick={() => setOpen(false)}>
        Meals
      </Link>

      {!loading && !user && (
        <>
          <Link href="/login" onClick={() => setOpen(false)}>
            Login
          </Link>
          <Link href="/register" onClick={() => setOpen(false)}>
            <Button className="w-full sm:w-auto">Register</Button>
          </Link>
        </>
      )}

      {!loading && user && (
        <>
          {user.role === "CUSTOMER" && (
            <>
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="relative flex items-center gap-2"
              >
                <ShoppingCart size={18} /> Cart{" "}
                {cartCount > 0 && `(${cartCount})`}
              </Link>
              <Link href="/orders" onClick={() => setOpen(false)}>
                My Orders
              </Link>
              <Link href="/profile" onClick={() => setOpen(false)}>
                Profile
              </Link>
            </>
          )}
          {user.role === "PROVIDER" && (
            <>
              <Link href="/provider/dashboard" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
              <Link href="/provider/menu" onClick={() => setOpen(false)}>
                Menu
              </Link>
              <Link href="/provider/orders" onClick={() => setOpen(false)}>
                Orders
              </Link>
            </>
          )}
          {user.role === "ADMIN" && (
            <>
              <Link href="/admin" onClick={() => setOpen(false)}>
                Admin Dashboard
              </Link>
              {/* <Link href="/admin/users" onClick={() => setOpen(false)}>
                Users
              </Link>
              <Link href="/admin/orders" onClick={() => setOpen(false)}>
                Orders
              </Link>
              <Link href="/admin/categories" onClick={() => setOpen(false)}>
                Categories
              </Link> */}
            </>
          )}
          <Button
            variant="outline"
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="w-full sm:w-auto"
          >
            Logout
          </Button>
        </>
      )}
    </>
  );

  return (
    <nav className="border-b sticky top-0 bg-background z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold">
          Platterly
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-5">
          <NavLinks />
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          {user?.role === "CUSTOMER" && cartCount > 0 && (
            <Link href="/cart" className="relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-chili text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </Link>
          )}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <button aria-label="Menu">
                  <Menu size={22} />
                </button>
              }
            />
            <SheetContent side="right" className="p-6">
              <div className="flex flex-col gap-4 mt-8">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
