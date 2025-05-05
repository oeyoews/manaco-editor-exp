<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
      <div class="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white">Editor Settings</h2>
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>

      <div class="p-4 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Font Size
          </label>
          <input
            type="number"
            v-model.number="localSettings.fontSize"
            min="8"
            max="32"
            class="w-full px-3 py-2 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div class="flex items-center">
          <input
            type="checkbox"
            id="lineNumbers"
            v-model="localSettings.lineNumbers"
            class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label for="lineNumbers" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Show Line Numbers
          </label>
        </div>

        <div class="flex items-center">
          <input
            type="checkbox"
            id="minimap"
            v-model="localSettings.minimap"
            class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label for="minimap" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Show Minimap
          </label>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Word Wrap
          </label>
          <select
            v-model="localSettings.wordWrap"
            class="w-full px-3 py-2 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="off">Off</option>
            <option value="on">On</option>
            <option value="wordWrapColumn">Word Wrap Column</option>
            <option value="bounded">Bounded</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tab Size
          </label>
          <input
            type="number"
            v-model.number="localSettings.tabSize"
            min="1"
            max="8"
            class="w-full px-3 py-2 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div class="flex items-center">
          <input
            type="checkbox"
            id="vimMode"
            v-model="localSettings.vimMode"
            class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label for="vimMode" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            启用 Vim 模式
          </label>
        </div>
      </div>

      <div class="flex justify-end p-4 border-t dark:border-gray-700">
        <button
          @click="$emit('close')"
          class="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          @click="saveSettings"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { EditorSettings } from '../types';

export default defineComponent({
  name: 'SettingsModal',
  props: {
    settings: {
      type: Object as PropType<EditorSettings>,
      required: true
    }
  },
  emits: ['save', 'close'],
  setup(props, { emit }) {
    const localSettings = ref<EditorSettings>({...props.settings});

    const saveSettings = () => {
      emit('save', localSettings.value);
    };

    return {
      localSettings,
      saveSettings
    };
  }
});
</script>
