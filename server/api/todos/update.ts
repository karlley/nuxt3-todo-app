import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler( async(event) =>{
    const body = await readBody(event);
    const { id, status, title } = body;

    try {
        const updateTodo = await prisma.todo.update({
            where: {id: id},
            data: {
                status: status,
                title: title,
            },
        });
        return updateTodo;
    } catch (error) {
        console.error(error);
    }
});
