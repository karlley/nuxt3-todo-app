export default defineEventHandler(async (event) => {
    return [
        {
            id: 1,
            status: 'pending',
            title: 'タスク1 api',
        },
        {
            id: 2,
            status: 'working',
            title: 'タスク2 api',
        },
        {
            id: 3,
            status: 'completed',
            title: 'タスク3 api',
        }
    ];
});
