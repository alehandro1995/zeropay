import {prisma} from "../../../../../prisma/client";
import PasswordForm from "../../../../components/PasswordForm";

async function Page({params}: {params: Promise<{ slug: string }>}) {
  const {slug} = await params;
  const user = await prisma.user.findUnique({
    where: {
      inviteToken: slug
    }
  });

  if (!user) {
    throw new Error("User not found");
  }

  return ( 
    <div className="flex justify-center relative px-2">
      <div className="bg-white mx-auto rounded-2xl shadow-sm p-4 mt-20">
        <h3 className="text-2xl font-bold">Создать новый пароль</h3>
        <PasswordForm user={user} />
      </div>
    </div>
  );
}

export default Page;