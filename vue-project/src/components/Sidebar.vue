<template>
  <aside 
    :class="`w-56 flex-shrink-0 overflow-y-auto transition-all duration-200 ${
      isDarkTheme 
        ? 'bg-gray-900 text-gray-300' 
        : 'bg-gray-100 text-gray-700'
    }`"
  >
    <div class="p-4">
      <h2 class="text-sm font-semibold uppercase tracking-wider mb-3 opacity-70">
        Explorer
      </h2>
      
      <div class="space-y-1">
        <button
          v-for="file in files"
          :key="file.id"
          @click="setActiveFile(file)"
          :class="`w-full text-left px-2 py-1.5 rounded flex items-center text-sm transition-colors ${
            activeFile?.id === file.id 
              ? isDarkTheme 
                ? 'bg-gray-700 text-white' 
                : 'bg-gray-200 text-gray-900'
              : isDarkTheme
                ? 'hover:bg-gray-700/50' 
                : 'hover:bg-gray-200/50'
          }`"
        >
          <span class="mr-2">{{ getFileIcon(file.language) }}</span>
          <span class="truncate">{{ file.name }}</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { File } from '../types';

export default defineComponent({
  name: 'Sidebar',
  props: {
    files: {
      type: Array as PropType<File[]>,
      required: true
    },
    activeFile: {
      type: Object as PropType<File | null>,
      required: true
    },
    setActiveFile: {
      type: Function as PropType<(file: File) => void>,
      required: true
    },
    isDarkTheme: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    const getFileIcon = (language: string) => {
      switch (language) {
        case 'javascript':
          return '📄';
        case 'typescript':
          return '📘';
        case 'html':
          return '🌐';
        case 'css':
          return '🎨';
        case 'json':
          return '📋';
        default:
          return '📄';
      }
    };

    return {
      getFileIcon
    };
  }
});
</script>
