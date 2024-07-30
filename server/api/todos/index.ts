import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default defineEventHandler( async() => {
    try {
        const todos = await prisma.todo.findMany();
        return todos;
    } catch (error) {
        console.error(error)
    }
});
