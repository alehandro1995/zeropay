import {prisma} from "../../../../prisma/client";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const email = cookieStore.get('email')?.value;
  if (!email){
    return new Response("User not found", { status: 400 });
  }
  
  const user = await prisma.user.findFirst({where: {email: email}});
  if (!user){
    return new Response("User not found", { status: 400 });
  }

  return Response.json({email: user.email, balance: user.balance});
}