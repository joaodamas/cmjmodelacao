import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMJ Operação | Painel Interno",
  description: "Painel operacional interno da CMJ Modelação.",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

