"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { FileIcon, StarIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  { name: "All Files", href: "/dashboard/files", icon: FileIcon },
  { name: "Favorites", href: "/dashboard/favorites", icon: StarIcon },
  { name: "Trash", href: "/dashboard/trash", icon: TrashIcon },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <div className="w-40 flex flex-col gap-4">
      {sidebarLinks.map(link => (
        <Link key={link.href} href={link.href}>
          <Button
            variant={"link"}
            className={cn("flex gap-2", {
              "text-blue-500": pathname.includes(link.href),
            })}
          >
            <link.icon /> {link.name}
          </Button>
        </Link>
      ))}
    </div>
  );
}
