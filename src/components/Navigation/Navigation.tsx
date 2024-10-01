"use client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const navItems = [
  { href: "/plants/blom", label: "Blóm", segment: "blom" },
  { href: "/plants/sveppir", label: "Sveppir", segment: "sveppir" },
  { href: "/plants/burknar", label: "Burknar", segment: "burknar" },
  { href: "/plants/flettur", label: "Fléttur", segment: "flettur" },
  { href: "/plants/mosar", label: "Mosar", segment: "mosar" },
];

export default function Navigation() {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="bg-green-700 p-4 fixed w-full top-0 z-50">
      <ul className="flex flex-wrap justify-center gap-4">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`text-white hover:text-green-200 transition-colors ${
                segment === item.segment ? "font-bold underline" : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
