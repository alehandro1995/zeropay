import Link from "next/link";
import {prisma} from "../../../../prisma/client";
import UserItem from "../../../components/UserItem"

export default async function AdminPage() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      inviteToken: true,
      role: true,
      status: true,
      balance: true
    }
  });

  if (!users) {
    throw new Error("User not found");
  }
  
  return (
    <div className="flex justify-center relative min-w-[1200px]">
      <Link href="/admin/create" className="btn absolute right-5 top-2">Создать пользователя</Link>
      <div className="w-[90%] mx-auto p-4 mt-20">
        <h3 className="text-2xl font-bold">Users</h3>
        <div className="flex flex-col gap-y-5 w-full">
          {users.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}