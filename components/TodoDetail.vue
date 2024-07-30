<template>
  <div class="wrapper">
    <div v-if="todo" class="todo">
      <ul>
        <li>Status:<span :style="getStatusColor(todo.status)">{{ todo.status }}</span></li>
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
const { todo, getTodo, getStatusColor } = useTodo();

onMounted(async () => {
  const selectedId = Number(route.params.id)
  todo.value = await getTodo(selectedId);
})
</script>

<style>
</style>
