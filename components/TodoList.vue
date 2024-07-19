<template>
  <div class="todo-wrapper">
    <div v-for="todo in todos" :key="todo.id" class="todo">
      <ul>
        <li>Status: {{ todo.status }}</li>
        <li>Title: {{ todo.title }}</li>
      </ul>
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

.todo {
  border: 1px solid black;
  width: 250px;
  margin-bottom: 20px;
}

.todo ul {
  list-style-type: none;
}

.todo li {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
