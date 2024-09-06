import type { Metadata } from "next";
import Link from "next/link"
import {
  Building,
  CircleHelpIcon,
  Home,
  Menu,
  MessageSquareCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggler";



export const metadata: Metadata = {
  title: "Retaily",
  description: "Retaily is a modern e-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen bg-background font-sans antialiased">
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <MessageSquareCode className="h-6 w-6" />
                <span className="">Retaily</span>
              </Link>
              {/* 
                <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Toggle notifications</span>
                </Button>
                */}
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium space-y-2 lg:px-4">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/products"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Building className="h-4 w-4" />
                  Products
                  {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      6
                    </Badge> */}
                </Link>
                {/* <Link
                  href="/dashboard/faq"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <CircleHelpIcon className="h-4 w-4" />
                  FAQs{" "}
                </Link> */}
              </nav>
            </div>
            <div className="mt-auto p-4">
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <MessageSquareCode className="h-6 w-6" />
                    <span className="sr-only">Flash Notes</span>
                  </Link>
                  <Link
                    href="/dashboard"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/productss"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Building className="h-5 w-5" />
                    Products
                    {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        6
                      </Badge> */}
                  </Link>
                  {/* <Link
                    href="/dashboard/faq"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <CircleHelpIcon className="h-5 w-5" />
                    FAQs
                  </Link> */}
                </nav>
                <div className="mt-auto">
                </div>
              </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
              {/* <form>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                    />
                  </div>
                </form> */}
            </div>
            <ModeToggle/>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          {children}
        </div>
      </div>
    </section>
  );
} 