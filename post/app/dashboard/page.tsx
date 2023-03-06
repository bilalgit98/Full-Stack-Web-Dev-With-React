import { getServerSession } from "next-auth";
import { authOption } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import MyPosts from "./MyPosts";
export default async function Dashboard() {
  const session = await getServerSession(authOption);
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main>
      <h1 className="text-2xl font-bold">Welcome Back {session?.user?.name}</h1>
      <MyPosts />
    </main>
  );
}
