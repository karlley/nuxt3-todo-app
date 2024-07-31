import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler( async(event) => {
    const selectedId = await readBody(event);

    try {
        await prisma.todo.delete({
            where: { id: selectedId },
        });
        return selectedId;
    } catch (error) {
        console.error(error);
    }
});
