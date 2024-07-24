import { useStorage } from '@vueuse/core';
import type { Router } from 'vue-router';

type Todo = {
    id: number;
    status: 'pending' | 'working' | 'completed';
    title: string;
}

const todos = useStorage<Todo[]>('todos', []);

const resetTodos = async () => {
    try {
        const response = await fetch('/api/initialize');
        // const initialData = await response.json();
        // todos.value = initialData;
        todos.value = await response.json();
    } catch (error) {
        console.error(error);
    }
}

const deleteTodo = (deleteId: number): void => {
    todos.value = todos.value.filter(todo => todo.id !== deleteId);
}

const getTodo = (selectedTodoId: number) => {
    return todos.value.find((todo) => todo.id === selectedTodoId);
}

const createTodo = async (inputForm: { title: string; status: 'pending' | 'working' | 'completed' }, router: Router): Promise<void> => {
    const newTodoId = todos.value.length + 1;
    const newTodo: Todo = {
        id: newTodoId,
        title: inputForm.title,
        status: inputForm.status,
    }
    todos.value.push(newTodo);
    inputForm.title = '';
    inputForm.status = 'pending';
    await router.push('/todos');
}

const updateTodo = async (inputForm: { title: string; status: 'pending' | 'working' | 'completed'}, router: Router, selectedTodoId: number): Promise<void> => {
    const index = todos.value.findIndex((todo) => todo.id === selectedTodoId);
    //findIndexの返り値でtodoの存在確認(アンマッチ時は-1)
    if (index !== -1) {
        //対象todoのプロパティを保持しながら更新
        todos.value[index] = {
            ...todos.value[index],
            title: inputForm.title,
            status: inputForm.status
        }
    }
    await router.push('/todos');
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
    resetTodos,
    deleteTodo,
    getTodo,
    createTodo,
    updateTodo,
    getStatusColor,
})