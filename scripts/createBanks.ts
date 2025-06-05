import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	await prisma.bank_name.deleteMany();
	
	await prisma.bank_name.createMany({
		data: [
			{name: 'Тинькофф'},
			{name: 'Сбербанк'},
			{name: 'Альфа-Банк'},
			{name: 'ВТБ'},
			{name: 'Россельхозбанк'},
			{name: 'Почта Банк'},
			{name: 'Уралсиб'},
			{name: 'Газпромбанк'},
			{name: 'МТС Банк'},
			{name: 'ОТП Банк'},	
			{name: 'БКС Банк'},
			{name: 'Промсвязьбанк'},
			{name: 'Убрир Банк'},
			{name: 'АкБарс Банк'},
		]
	})
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})