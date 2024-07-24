<template>
  <div class="wrapper">
    <div v-if="todo" class="todo">
      <ul>
        <li>Status: {{ todo.status }}</li>
        <li>Title: {{ todo.title }}</li>
      </ul>
    </div>
    <div v-else>
      <p>Todo not found.</p>
    </div>
    <div>
      <NuxtLink :to="`/todos`">
        <button>Back</button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useTodo } from '~/composables/useTodo'

const route = useRoute();
const { getTodo } = useTodo();
const selectedTodoId = Number(route.params.id)
const todo = getTodo(selectedTodoId);
</script>

<style>
</style>
