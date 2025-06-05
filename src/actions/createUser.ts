"use server";
import {prisma} from "../../prisma/client";
import { randomBytes } from "crypto";
import { redirect } from "next/navigation";
import type { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createUser(prevState: any, formData: FormData) {

  const email = formData.get("email") as string;
  if (!email) {
    return { message: 'Обязательное поле' }
  }

  const userExists = await prisma.user.findFirst({
    where: {
      email: email
    }
  });

  if (userExists) {
    return { message: 'Пользователь с таким Email существует!' }
  }

  const user:User = await prisma.user.create({
    data: {
      email: email,
      inviteToken: randomBytes(8).toString("hex")
    }
  });

  console.log(user);
  revalidatePath("/admin");
  redirect("/admin")
}
