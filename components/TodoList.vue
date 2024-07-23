<template>
  <div class="wrapper">
    <div>
      <NuxtLink :to="`/todos/new`">
        <button>New</button>
      </NuxtLink>
    </div>
    <div v-for="todo in todos" :key="todo.id" class="todo">
      <NuxtLink :to="`/todos/${todo.id}`" class="link">
      <ul>
        <li>Status: {{ todo.status }}</li>
        <li>Title: {{ todo.title }}</li>
      </ul>
      </NuxtLink>
      <div class="todo-button">
        <NuxtLink :to="`/todos/${todo.id}/edit`">
          <button>Edit</button>
        </NuxtLink>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core'

type Todo = {
  id: number;
  status: 'pending' | 'working' | 'completed';
  title: string;
}

const todos = useStorage<Todo[]>('todos', [
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
]);

const deleteTodo = (deleteId: number): void => {
  todos.value = todos.value.filter(todo => todo.id !== deleteId);
}

</script>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wrapper button {
  background: inherit;
  padding: 5px 10px;
  border: 1px solid black;
  margin: 30px 20px;
}

.link {
  text-decoration: none;
  color: inherit; /* 親要素から色を継承 */
}

.todo {
  border: 1px solid black;
  width: 250px;
  margin-bottom: 30px;
}

.todo ul {
  list-style-type: none;
  margin: 0;
}

.todo li {
  margin: 0;
  padding-top: 5px;
  padding-bottom: 5px;
}

.todo-button {
  display: flex;
  justify-content: space-around;
}

.todo-button button {
  margin: 10px;
}
</style>
