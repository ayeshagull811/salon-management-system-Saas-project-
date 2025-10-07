import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserAdminDashboardClient from "./UserAdminDashboardClient";

export default async function UserAdminDashboardLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login"); // agar token nahi → login
  }

  return <UserAdminDashboardClient>{children}</UserAdminDashboardClient>;
}
