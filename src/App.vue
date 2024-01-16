<script setup>
import { useNoteStore } from './stores/NoteStore';

const noteStore = useNoteStore();

import TheHeader from './components/UI/TheHeader.vue';
import TheCard from './components/TheCard.vue';
import TheModal from './components/TheModal.vue';
import EditNote from './components/EditNote.vue';
import { ref, watch } from 'vue';
</script>

<template>
  <main>
    <div class="container">
      <Teleport to="#modal">
        <Transition name="modal">
          <TheModal></TheModal>
        </Transition>
      </Teleport>
      <TheHeader></TheHeader>
      <TheCard :notes="noteStore.notes"></TheCard>
      <Teleport to="body">
        <EditNote></EditNote>
      </Teleport>
    </div>
  </main>
</template>

<style scoped>
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.2s ease-out;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}

main {
  height: 100vh;
  width: 100%;
}

.container {
  max-width: 1108px;
  padding: 10px;
  margin: 0 auto;
}
</style>
