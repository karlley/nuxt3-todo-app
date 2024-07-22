<template>
  <div class="wrapper">
    <div>
      <p>Title: <input v-model="inputForm.title"></p>
      <p>Status:
      <select v-model="inputForm.status">
        <option>pending</option>
        <option>working</option>
        <option>completed</option>
      </select>
      </p>
    </div>
    <div>
      <NuxtLink :to="`/todos`">
        <button>Back</button>
      </NuxtLink>
      <button @click="addTodo">Save</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

type Todo = {
  id: number;
  status: 'pending' | 'working' | 'completed';
  title: string;
}

type InputForm = {
  title: string;
  status: 'pending' | 'working' | 'completed';
}

//フォームからの値を受ける
const inputForm = reactive<InputForm>({
  title: '',
  status: 'pending'
})
const todos = useStorage<Todo[]>('todos', [])
const router = useRouter();

const addTodo = (): void => {
  const newTodoId = todos.value.length + 1;
  const newTodo: Todo = {
    id: newTodoId,
    title: inputForm.title,
    status: inputForm.status,
  }
  todos.value.push(newTodo)
  inputForm.title = '';
  inputForm.status = 'pending';
  router.push('/todos');
}
</script>

<style>
</style>
