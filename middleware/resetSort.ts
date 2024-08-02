// import { useTodo } from '~/composables/useTodo';

export default defineNuxtRouteMiddleware((to, from) => {
    //特定の遷移元からの遷移時のみ処理を実行する

    // const { resetSort } = useTodo();
    //遷移先
    const isTargetPath = to.path === '/todos';
    //遷移元
    const isReloadFromTodosOrHome = from.path === '/todos' || from.path === '/';

    if (isTargetPath && !isReloadFromTodosOrHome) {
        //ここで処理呼び出し
    }
})
