import { useTodo } from '~/composables/useTodo';

export default defineNuxtRouteMiddleware((to, from) => {
    const { resetSort } = useTodo();
    //遷移先
    const isTargetPath = to.path === '/todos';
    //遷移元
    const isReloadFromTodosOrHome = from.path === '/todos' || from.path === '/';

    if (isTargetPath && !isReloadFromTodosOrHome) {
        // resetSort();
    }
})
