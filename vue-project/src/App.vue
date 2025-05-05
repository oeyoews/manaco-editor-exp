<template>
  <div class="h-screen flex flex-col" :class="{ 'dark': isDarkTheme }">
    <Header
      :isDarkTheme="isDarkTheme"
      :toggleTheme="toggleTheme"
      :activeFile="activeFile"
      :editorSettings="editorSettings"
      :setEditorSettings="updateEditorSettings"
    />
    <div class="flex flex-1 overflow-hidden">
      <Sidebar
        :files="files"
        :activeFile="activeFile"
        :setActiveFile="setActiveFile"
        :isDarkTheme="isDarkTheme"
      />
      <EditorPanel
        :file="activeFile"
        :updateFile="updateFile"
        :isDarkTheme="isDarkTheme"
        :editorSettings="editorSettings"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import EditorPanel from './components/EditorPanel.vue';
import { File, EditorSettings } from './types';
import { sampleFiles } from './data/sampleFiles';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Sidebar,
    EditorPanel
  },
  setup() {
    const isDarkTheme = ref(true);
    const activeFile = ref<File | null>(sampleFiles[0]);
    const files = ref<File[]>(sampleFiles);
    const editorSettings = ref<EditorSettings>({
      fontSize: 14,
      lineNumbers: true,
      minimap: true,
      wordWrap: 'off',
      tabSize: 2,
      vimMode: false,
    });

    const toggleTheme = () => {
      isDarkTheme.value = !isDarkTheme.value;
    };

    const updateFile = (updatedFile: File) => {
      files.value = files.value.map(file =>
        file.id === updatedFile.id ? updatedFile : file
      );

      if (activeFile.value?.id === updatedFile.id) {
        activeFile.value = updatedFile;
      }
    };

    const setActiveFile = (file: File | null) => {
      activeFile.value = file;
    };

    const updateEditorSettings = (settings: EditorSettings) => {
      editorSettings.value = settings;
    };

    return {
      isDarkTheme,
      activeFile,
      files,
      editorSettings,
      toggleTheme,
      updateFile,
      setActiveFile,
      updateEditorSettings
    };
  }
});
</script>

<style>
/* Global styles can be added here */
</style>
