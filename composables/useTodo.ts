import { useStorage } from '@vueuse/core';
import type { RouteLocationNormalizedLoaded, Router} from 'vue-router';
import { ref } from "vue";

type Todo = {
    id: number;
    status: 'pending' | 'working' | 'completed';
    title: string;
}

const todos = useStorage<Todo[]>('todos', []);

const todo = ref({});

const resetSort = () => {
    pending.value = true;
    working.value = true;
    completed.value = true;
}

const getTodos = async () => {
    try {
        const response = await fetch('/api/todos');
        todos.value = await response.json();
    } catch (error) {
        console.error(error);
    }
}

const resetTodos = async () => {
    try {
        const response = await fetch('/api/initialize');
        todos.value = await response.json();
        resetSort();
    } catch (error) {
        console.error(error);
    }
}


const deleteTodo = async (deleteId: number | null): Promise<void> => {
    try {
       const response = await fetch('/api/todos/delete', {
           method: 'DELETE',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(deleteId),
       });
       console.log(response);
       await getTodos();
    } catch (error) {
        console.log(error)
    }
}

const getTodo = async (selectedId: number) => {
    try {
        const response = await fetch(`/api/todos/${selectedId}`);
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

const createTodo = async (inputForm: { title: string; status: 'pending' | 'working' | 'completed' }, router: Router): Promise<void> => {
    try {
        const response = await fetch('/api/todos/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputForm),
        });
        inputForm.title = '';
        inputForm.status = 'pending';
        resetSort();
        const newTodo = await response.json();
        await router.push(`/todos/${newTodo.id}`);
    } catch (error) {
        console.error(error);
    }
}

const updateTodo = async (inputForm: { title: string; status: 'pending' | 'working' | 'completed'}, router: Router, selectedId: number): Promise<void> => {
    try {
        const response = await fetch('/api/todos/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            //inputFormに追加でidを加える
            body: JSON.stringify({ ...inputForm, id: selectedId }
            ),
        });
        inputForm.title = '';
        inputForm.status = 'pending';
        resetSort();
        const updateTodo = await response.json();
        await router.push(`/todos/${updateTodo.id}`);
    } catch (error) {
        console.error(error);
    }
}

const getStatusColor = (status: 'pending' | 'working' | 'completed') => {
    if (status === 'pending') {
        return { background: 'red' }
    } else if (status === 'working') {
        return { background: 'yellow' }
    } else if (status === 'completed') {
        return { background: 'green' }
    }
}

const pending = ref(true);
const working = ref(true);
const completed = ref(true);
const filteredTodos = computed(() => {
    return todos.value.filter(todo => {
        const isPending = todo.status === 'pending' && pending.value;
        const isWorking = todo.status === 'working' && working.value;
        const isCompleted = todo.status === 'completed' && completed.value;

        return isPending || isWorking || isCompleted;
    });
});

const keepSortQuery = async (route: RouteLocationNormalizedLoaded, router: Router) => {
    //クエリにtrueがある場合にtrueを初期クエリにセット
    const initialQuery = {
        pending: route.query.pending === 'true',
        working: route.query.working === 'true',
        completed: route.query.completed === 'true',
    }
    // クエリが発生しているか
    const statusQueryKeys = ['pending', 'working', 'completed'];
    const hasStatusQueries = statusQueryKeys.some(key => Object.hasOwn(route.query, key))
    // クエリ有りでソート状態を更新
    if (hasStatusQueries) {
        pending.value = initialQuery.pending;
        working.value = initialQuery.working;
        completed.value = initialQuery.completed;
    } else {
        pending.value = false;
        working.value = false;
        completed.value = false;
    }
    // 追加用クエリ
    const newQuery = {
        pending: initialQuery.pending ? 'true' : undefined,
        working: initialQuery.working ? 'true' : undefined,
        completed: initialQuery.completed ? 'true' : undefined,
    }
    // クエリが存在する場合のみクエリを連結
    await router.push({query: newQuery});
}

const updateSortQuery = async (router: Router) => {
    const updateQuery = {
        pending: pending.value ? 'true' : undefined,
        working: working.value ? 'true' : undefined,
        completed: completed.value ? 'true' : undefined,
    }
    await router.push({query: updateQuery});
}

export const useTodo = () => ({
    todos,
    todo,
    pending,
    working,
    completed,
    getTodos,
    resetTodos,
    deleteTodo,
    getTodo,
    createTodo,
    updateTodo,
    getStatusColor,
    filteredTodos,
    keepSortQuery,
    updateSortQuery,
})
