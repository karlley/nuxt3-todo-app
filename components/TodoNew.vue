<template>
  <div class="wrapper">
    <form @submit.prevent="handleSubmit">
      <div class="form">
      <label>
        Title:
        <input v-model="inputForm.title" type="text" required>
      </label>
      </div>
      <div class="form">
        <label>
          Status:
          <select v-model="inputForm.status">
            <option value="pending">pending</option>
            <option value="working">working</option>
            <option value="completed">completed</option>
          </select>
        </label>
      </div>
      <NuxtLink :to="`/todos`">
        <button>Back</button>
      </NuxtLink>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useTodo } from '~/composables/useTodo'
import type { InputForm } from '~/types/types'

//リアクティブ値としてフォーム初期値をセット
const inputForm = reactive<InputForm>({
  title: '',
  status: 'pending'
})
const router = useRouter();
const { createTodo } = useTodo();
const handleSubmit = (): void => {
  createTodo(inputForm, router);
}
</script>

<style>
.form {
  margin: 20px 0;
}
</style>
