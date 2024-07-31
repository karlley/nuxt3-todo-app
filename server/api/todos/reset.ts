import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
    const initialTodos = [
        {
            id: 1,
            status: 'pending',
            title: 'タスク1',
        },
        {
            id: 2,
            status: 'working',
            title: 'タスク2',
        },
        {
            id: 3,
            status: 'completed',
            title: 'タスク3',
        }
    ];

    try {
        //全削除
        await prisma.todo.deleteMany({});
        //初期データ追加
        await prisma.todo.createMany({
            data: initialTodos
        })
    } catch (error) {
        console.error(error);
    }
});
