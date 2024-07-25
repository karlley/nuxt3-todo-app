import { ref } from 'vue'

const selectedTodoId = ref<number | null>(null)
const isModalOpen = ref(false)
const openModal = (id: number) => {
    selectedTodoId.value = id;
    isModalOpen.value = true;
}
const closeModal = () => {
    isModalOpen.value = false;
}

export const useModal = () => ({
    selectedTodoId,
    isModalOpen,
    openModal,
    closeModal
})
