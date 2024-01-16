<script setup>
import { useNoteStore } from '../stores/NoteStore';
import { ref, computed, watch } from 'vue';

const error = ref(false);
const noteStore = useNoteStore();
const enteredLetterLength = ref(0);
const selectedNote = computed(() => noteStore.selectedNote);

const updateLetterLength = () => {
  enteredLetterLength.value = selectedNote.value.text.length;
};

const saveEditedNote = () => {
  if (selectedNote.value.text.length < 3) {
    error.value = true;
    return;
  }

  noteStore.EditNote(selectedNote.value);
  noteStore.originalText = selectedNote.value.text;
  error.value = false;
  noteStore.editNoteModal = false; // Close the modal
};

const originalText = ref('');

watch(selectedNote, () => {
  enteredLetterLength.value = selectedNote.value.text.length;
  originalText.value = selectedNote.value.text; // Set initial original text
});

const cancelEdit = () => {
  selectedNote.value.text = noteStore.originalText; // Revert to original text
  noteStore.editNoteModal = false; // Close the modal
};
</script>

<template>
  <div v-if="noteStore.editNoteModal" class="backdrop"></div>
  <transition name="edit-modal">
    <dialog open v-if="noteStore.editNoteModal">
      <div class="edit-note-container">
        <h1>Edit Note</h1>
        <textarea
          v-model.trim="selectedNote.text"
          name="editNote"
          id="editNote"
          cols="30"
          rows="10"
          @input="updateLetterLength"
          maxlength="200"></textarea>
        <p>{{ enteredLetterLength }} / 200</p>
        <p class="error-text" v-if="error">
          Note needs to be 3 characters or more (spaces not included!)
        </p>
        <button @click="saveEditedNote">Save Changes</button>
        <button class="cancel-btn" @click="cancelEdit">Cancel</button>
      </div>
    </dialog>
  </transition>
</template>

<style scoped>
.error-text {
  color: rgb(163, 7, 7);
  margin: 4px;
}

.edit-modal-enter-active {
  animation: modalAnimation 0.2s ease-in;
}

.edit-modal-leave-active {
  animation: modalAnimation 0.2s ease-in reverse;
}

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

.edit-note-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

textarea {
  font: inherit;
  border: 1px solid black;
  padding: 16px;
  font-weight: 500;
  resize: none;
  font-size: 16px;
}

button {
  padding: 8px 16px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  background-color: blueviolet;
  color: white;
  cursor: pointer;
  margin-top: 15px;
}

.cancel-btn {
  background-color: #eee;
  color: black;
}

.edit-note-container h1 {
  margin-bottom: 12px;
}

dialog {
  width: 75%;
  max-height: 70vh; 
  max-width: 600px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 1rem;
  background-color: white;
  z-index: 100;
  border: none;
}

@keyframes modalAnimation {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) translateY(10px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translate(-50%, -50%) translateY(0) scale(1);
  }
}
</style>
