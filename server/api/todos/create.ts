import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler( async(event) => {
    const body = await readBody(event);
    const { status, title } = body;
    try {
        const newTodo = await prisma.todo.create({
            data: {
                status,
                title,
            },
        });
        return newTodo;
    } catch (error) {
        console.error(error)
    }
});
