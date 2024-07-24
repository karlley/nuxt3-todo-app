<template>
  <div class="wrapper">
    <div>
      <NuxtLink :to="`/todos/new`">
        <button>New</button>
      </NuxtLink>
      <button @click="resetTodos">Reset</button>
    </div>
    <div v-if="todos.length">
      <div v-for="todo in todos" :key="todo.id" class="todo">
        <NuxtLink :to="`/todos/${todo.id}`" class="link">
        <ul>
          <li>Status: <span v-bind:style="getStatusColor(todo.status)">{{ todo.status }}</span></li>
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
    <div v-else>
      <p>Todo not found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { useTodo } from '~/composables/useTodo'

type Todo = {
  id: number;
  status: 'pending' | 'working' | 'completed';
  title: string;
}

//localStorageから取得
const todos = useStorage<Todo[]>('todos', []);
const { resetTodos, deleteTodo, getStatusColor } = useTodo();
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
