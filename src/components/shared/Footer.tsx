export default function Footer() {
  return (
    <footer className="border-t mt-auto py-6">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Platterly. All rights reserved.
      </div>
    </footer>
  );
}
