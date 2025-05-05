<template>
  <header :class="`h-12 flex items-center justify-between px-4 ${
    isDarkTheme 
      ? 'bg-gray-800 text-white border-b border-gray-700' 
      : 'bg-white text-gray-800 border-b border-gray-300'
  }`">
    <div class="flex items-center space-x-4">
      <div class="text-lg font-medium">Monaco Editor</div>
      <div class="hidden md:flex items-center space-x-2 text-sm">
        <span v-if="activeFile" class="opacity-70">{{ activeFile.path }}</span>
      </div>
    </div>

    <div class="flex items-center space-x-3">
      <button 
        class="p-1.5 rounded-md transition-colors hover:bg-opacity-20 hover:bg-gray-500"
        title="Command Palette (Ctrl+Shift+P)"
      >
        <!-- Replace with icon component or SVG -->
        <span>⌘</span>
      </button>
      
      <button 
        class="p-1.5 rounded-md transition-colors hover:bg-opacity-20 hover:bg-gray-500" 
        @click="isSettingsOpen = true"
        title="Editor Settings"
      >
        <!-- Replace with icon component or SVG -->
        <span>⚙️</span>
      </button>
      
      <button 
        class="p-1.5 rounded-md transition-colors hover:bg-opacity-20 hover:bg-gray-500"
        title="Save File (Ctrl+S)"
      >
        <!-- Replace with icon component or SVG -->
        <span>💾</span>
      </button>

      <button 
        class="p-1.5 rounded-md transition-colors hover:bg-opacity-20 hover:bg-gray-500" 
        @click="toggleTheme"
        :title="isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'"
      >
        <!-- Replace with icon component or SVG -->
        <span v-if="isDarkTheme">☀️</span>
        <span v-else>🌙</span>
      </button>
    </div>

    <SettingsModal 
      v-if="isSettingsOpen"
      :settings="editorSettings"
      @save="saveSettings"
      @close="isSettingsOpen = false"
    />
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { File, EditorSettings } from '../types';
import SettingsModal from './SettingsModal.vue';

export default defineComponent({
  name: 'Header',
  components: {
    SettingsModal
  },
  props: {
    isDarkTheme: {
      type: Boolean,
      required: true
    },
    toggleTheme: {
      type: Function as PropType<() => void>,
      required: true
    },
    activeFile: {
      type: Object as PropType<File | null>,
      required: true
    },
    editorSettings: {
      type: Object as PropType<EditorSettings>,
      required: true
    },
    setEditorSettings: {
      type: Function as PropType<(settings: EditorSettings) => void>,
      required: true
    }
  },
  setup(props) {
    const isSettingsOpen = ref(false);

    const saveSettings = (newSettings: EditorSettings) => {
      props.setEditorSettings(newSettings);
      isSettingsOpen.value = false;
    };

    return {
      isSettingsOpen,
      saveSettings
    };
  }
});
</script>
