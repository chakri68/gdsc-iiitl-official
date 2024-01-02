import React from "react";
import Dashboard from "@/components/Dashboard";
import { verifyToken } from "@/lib/server/auth-utils";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// PROTECTED ROUTES

export const metadata: Metadata = {
  title: "User Dashboard | GDSC IIITL",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get("token")?.value;
  if (!token || !verifyToken(token, (auth) => auth.role === "user"))
    redirect("/auth/user/login");

  return (
    <html lang="en">
      <body>
        <Dashboard.Layout>{children}</Dashboard.Layout>
      </body>
    </html>
  );
}
