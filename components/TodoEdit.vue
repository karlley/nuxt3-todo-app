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
      <button type="submit">Update</button>
      <NuxtLink :to="`/todos`">
        <button>Back</button>
      </NuxtLink>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTodo } from '~/composables/useTodo';

type InputForm = {
  title: string;
  status: 'pending' | 'working' | 'completed';
}

const route = useRoute(); //パラメータ取得
const selectedTodoId = Number(route.params.id);
const { getTodo, updateTodo } = useTodo();
const todo = getTodo(selectedTodoId);
//リアクティブ値としてフォーム初期値をセット
const inputForm = reactive<InputForm>({
  title: todo?.title ?? '',
  status: todo?.status ?? 'pending'
})
const router = useRouter();
const handleSubmit = (): void => {
  updateTodo(inputForm, router, selectedTodoId);
}
</script>

<style>
</style>
