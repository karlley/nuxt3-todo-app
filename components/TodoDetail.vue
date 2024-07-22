<template>
  <div class="wrapper">
    <div class="todo">
      <ul>
        <li>Status: {{ todo.status }}</li>
        <li>Title: {{ todo.title }}</li>
      </ul>
    </div>
    <div>
      <NuxtLink :to="`/todos`">
        <button>Back</button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { useRoute } from 'vue-router';

type Todo = {
  id: number;
  status: 'pending' | 'working' | 'completed';
  title: string;
}

const route = useRoute();
const selectedTodoId = Number(route.params.id)
//取得(初期値の[])は必須
const todos = useStorage<Todo[]>('todos', [])
//対象todo
const todo = todos.value.find((todo) => todo.id === selectedTodoId);
</script>

<style>
</style>
