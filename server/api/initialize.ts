export default defineEventHandler(async () => {
    return [
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
});
