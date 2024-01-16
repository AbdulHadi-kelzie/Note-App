<script setup>
import EditNote from './EditNote.vue';
import { useNoteStore } from '../stores/NoteStore';

const noteStore = useNoteStore();
import { ref } from 'vue';

const prop = defineProps(['notes']);

const DeleteDialog = ref(false);
const selectedNoteId = ref(null);

const openDeleteDialog = (noteId) => {
  DeleteDialog.value = true;
  selectedNoteId.value = noteId;
};

const confirmDeleteBTN = () => {
  noteStore.DeleteNote(selectedNoteId.value);
  DeleteDialog.value = false;
};

const emit = defineEmits(['openEdit'])

const openEditDialog = (note) => {
  selectedNoteId.value = note.id;
  noteStore.selectedNote = note;
  noteStore.editNoteModal = true;
  noteStore.originalText = note.text;


};
</script>

<template>
  <div class="card__container">
    <TransitionGroup name="card">
      <div
        v-for="note in notes"
        :key="note.id"
        class="card"
        @click="openEditDialog(note)"
        :style="{ backgroundColor: note.color }">
        <p class="note-text">{{ note.text }}</p>
        <div class="bottom-nav">
          <p class="date">{{ note.date }}</p>
          <button
            @click.stop="openDeleteDialog(note.id)"
            class="delete-note-btn">
            Delete Note
          </button>
          <Teleport to="body">
            <div
              @click="DeleteDialog = false"
              v-if="DeleteDialog && selectedNoteId === note.id"
              class="backdrop"></div>
            <Transition name="dialog">
              <dialog
                open
                v-if="DeleteDialog && selectedNoteId === note.id"
                class="delete-dialog">
                <p>Are You sure you want to delete this note?</p>
                <div class="dialog-btns">
                  <button
                    class="close-dialog-btn"
                    @click="DeleteDialog = false">
                    Cancel
                  </button>
                  <button @click="confirmDeleteBTN" class="confirm-delete-btn">
                    Delete
                  </button>
                </div>
              </dialog>
            </Transition>
          </Teleport>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>

.backdrop {
  position: absolute; 
  top: 0;
  left: 0; 
  width: 100%;
  height: 100vh;
  background-color: rgba(200, 200, 200, 0.7); 
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card__container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.card {
  width: 225px;
  height: 225px;
  padding: 16px;
  margin-right: 20px;
  margin-bottom: 20px;

  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.note-text {
  font-size: 16px;
  font-weight: 500;
  overflow-wrap: break-word;
}

.date {
  font-size: 14px;
  font-weight: 600;
}

.bottom-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-note-btn {
  background-color: transparent;
  padding: 8px 12px;
  border: none;
  outline: none;
  margin-right: 4px;
  margin-bottom: 4px;
  cursor: pointer;
}

.delete-note-btn:hover {
  background-color: rgb(201, 58, 58);
  color: white;
}

.delete-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 2px solid;
  border-radius: 10px;
  text-align: center;
  width: 400px;
  z-index: 1000;
}

.dialog-btns {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 14px;
}

.close-dialog-btn {
  background: #e1d3a7;
  border: none;
  outline: none;
  padding: 10px;
  font-family: 'Poppins';
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
}

.confirm-delete-btn {
  background: #ff5959;
  border: none;
  outline: none;
  padding: 10px;
  font-family: 'Poppins';
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  margin-left: 16px;
  color: white;
}

.confirm-delete-btn:hover {
  background-color: darkred;
}

.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.card-enter-active,
.card-leave-active,
.card-move {
  transition: all 0.3s ease;
}

.card-enter-to,
.card-leave-from {
  opacity: 1;
  transform: scale(1);
}

.card-leave-active {
  position: absolute;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.2s ease;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
}

@media (max-width: 850px) {
  .card__container {
    justify-content: center;
    column-gap: 20px;
  }

  .card {
    margin-right: 0;
    margin-bottom: 20px;
  }
}
</style>
