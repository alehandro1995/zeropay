import MainBalance from "@/components/MainBalance";
import { cookies } from "next/headers";
import { prisma } from "../../../prisma/client";	

export default async function Home() {
	const cookieStore = await cookies();
	const email = cookieStore.get("email")?.value;
	console.log("Email from cookie:", email);
	if (!email) {
		throw new Error("Email cookie not found");
	}

	const user = await prisma.user.findUnique({
		where: {
			email: email,
			}
	});

	if (!user) {
		throw new Error("User not found");
	}
	
  return (
    <section className="flex justify-center h-full w-full">
      <div className="w-[600px] flex flex-col items-center gap-y-5 mt-5">
        <div className="w-full bg-white rounded-2xl shadow-sm p-5">
          <h3 className="font-semibold text-lg mb-2">Торговое вознаграждение</h3>
          <h4 className="font-semibold">Приём</h4>
          {user.payInGambling !== 0 && 
						<h4><span className="uppercase">гемблинг, беттинг</span>: <b>{user.payInGambling}%</b></h4>
					}
					{user.payInExchangers !== 0 && 
						<h4><span className="uppercase">обменники</span>: <b>{user.payInExchangers}%</b></h4>
					}
          <h4 className="font-semibold">Выплата</h4>
					{ user.payOutGambling !== 0 &&
						<h4><span className="uppercase">гемблинг, беттинг</span>: <b>{user.payOutGambling}%</b></h4>
					}
					{ user.payOutExchangers !== 0 &&
						<h4><span className="uppercase">обменники</span>: <b>{user.payOutExchangers}%</b></h4>
					}
        </div>
        <h1 className="text-2xl ">Аккаунты:</h1>
				<MainBalance />
      </div>
    </section>
  );
}
