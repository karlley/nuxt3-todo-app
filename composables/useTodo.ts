import { useStorage } from '@vueuse/core';
import { ref } from "vue";
import type { Router} from 'vue-router';
import type { Todo } from '~/types/types';

const todos = ref<Todo[]>([]);
const todo = ref<Todo | null >(null);
const pending = useStorage<boolean>('pending', true);
const working = useStorage<boolean>('working' , true);
const completed = useStorage<boolean>('completed', true);

const filteredTodos = computed(() => {
    //配列型でソートされたTodoを返す
    return todos.value.filter(todo => {
        //todo.statusのpending、working、completedがソート状態とマッチしていればtrue
        const isPending = todo.status === 'pending' && pending.value;
        const isWorking = todo.status === 'working' && working.value;
        const isCompleted = todo.status === 'completed' && completed.value;

        //ソート状態がマッチしたtodoのみ返す
        return isPending || isWorking || isCompleted;
    });
});

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

const getTodo = async (selectedId: number) => {
    try {
        const response = await fetch(`/api/todos/${selectedId}`);
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

const resetTodos = async () => {
    try {
        await fetch('/api/todos/reset');
        resetSort();
        await getTodos();
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

const deleteTodo = async (deleteId: number | null): Promise<void> => {
    try {
        await fetch('/api/todos/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deleteId),
        });
        await getTodos();
    } catch (error) {
        console.error(error)
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


export const useTodo = () => ({
    todos,
    todo,
    pending,
    working,
    completed,
    getTodos,
    resetSort,
    resetTodos,
    deleteTodo,
    getTodo,
    createTodo,
    updateTodo,
    getStatusColor,
    filteredTodos,
})
