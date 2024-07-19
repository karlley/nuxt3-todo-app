<template>
  <div class="todo-wrapper">
    <div class="todo">
      <ul>
        <li>Status: {{ todo.status }}</li>
        <li>Title: {{ todo.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core';

const route = useRoute();
const id = Number(route.params.id)
//取得(初期値の[])は必須
const todos = useStorage('todos', [])
//対象todo
const todo = todos.value.find((todo) => todo.id === id);
</script>

<style>
</style>
