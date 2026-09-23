import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administrar INO100+",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
