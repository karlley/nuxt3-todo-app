<template>
  <div class="todo-wrapper">
    <div v-for="todo in todos" :key="todo.id" class="todo">
      <NuxtLink :to="`/todos/${todo.id}`" class="todo-link">
      <ul>
        <li>Status: {{ todo.status }}</li>
        <li>Title: {{ todo.title }}</li>
      </ul>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core';

const todos = useStorage('todos', [
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
</script>

<style>
.todo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todo-link {
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
</style>
