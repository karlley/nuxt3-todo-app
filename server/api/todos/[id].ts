import { PrismaClient } from '@prisma/client';
import { getRouterParams } from 'h3';

const prisma = new PrismaClient();
export default defineEventHandler( async (event) => {
    // useQueryを使用しない書き方
    // const selectedId = parseInt(event.context.params.id);
    const query = getRouterParams(event);
    const selectedId = parseInt(query.id);

    try {
        return await prisma.todo.findUnique({
            where: { id: selectedId },
        });
    } catch (error) {
        console.log(error);
    }
});
