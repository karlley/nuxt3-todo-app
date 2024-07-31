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
      <button type="submit">Update</button>
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
const { getTodo, updateTodo } = useTodo();
//リアクティブ値としてフォーム初期値をセット
const inputForm = reactive<InputForm>({
  title: '',
  status: 'pending'
})

const selectedId = Number(route.params.id)
onMounted(async () => {
  const fetchedTodo = await getTodo(selectedId);
  inputForm.title = fetchedTodo.title;
  inputForm.status = fetchedTodo.status;
})
const router = useRouter();
const handleSubmit = (): void => {
  updateTodo(inputForm, router, selectedId);
}
</script>

<style>
</style>
