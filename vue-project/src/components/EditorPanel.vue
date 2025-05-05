<template>
  <div :class="`flex-1 overflow-hidden flex flex-col ${
    isDarkTheme ? 'bg-gray-800' : 'bg-white'
  }`">
    <div v-if="file" class="h-full flex-1" ref="monacoEl"></div>
    <div
      v-if="file"
      ref="statusBarEl"
      :class="`h-6 px-2 text-xs flex items-center ${
        isDarkTheme ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
      }`"
    ></div>
    <div v-else class="h-full flex items-center justify-center text-gray-500">
      <p>选择一个文件进行编辑</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, onBeforeUnmount, PropType } from 'vue';
import * as monaco from 'monaco-editor';
import { initVimMode } from 'monaco-vim';
import { File, EditorSettings, Theme } from '../types';

export default defineComponent({
  name: 'EditorPanel',
  props: {
    file: {
      type: Object as PropType<File | null>,
      required: true
    },
    updateFile: {
      type: Function as PropType<(file: File) => void>,
      required: true
    },
    isDarkTheme: {
      type: Boolean,
      required: true
    },
    editorSettings: {
      type: Object as PropType<EditorSettings>,
      required: true
    }
  },
  setup(props) {
    const monacoEl = ref<HTMLElement | null>(null);
    const statusBarEl = ref<HTMLElement | null>(null);
    let editor: monaco.editor.IStandaloneCodeEditor | null = null;
    let vimMode: any = null;

    // 初始化编辑器
    onMounted(() => {
      if (monacoEl.value && props.file) {
        editor = monaco.editor.create(monacoEl.value, {
          value: props.file.content,
          language: props.file.language,
          theme: props.isDarkTheme ? 'vs-dark' : 'vs',
          automaticLayout: true,
          minimap: {
            enabled: props.editorSettings.minimap
          },
          fontSize: props.editorSettings.fontSize,
          lineNumbers: props.editorSettings.lineNumbers ? 'on' : 'off',
          wordWrap: props.editorSettings.wordWrap,
          tabSize: props.editorSettings.tabSize,
          scrollBeyondLastLine: false,
          renderLineHighlight: 'all',
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          snippetSuggestions: 'inline',
        });

        // 初始化 Vim 模式
        if (statusBarEl.value && props.editorSettings.vimMode) {
          vimMode = initVimMode(editor, statusBarEl.value);
        }

        // 当编辑器内容变化时更新文件内容
        editor.onDidChangeModelContent(() => {
          if (props.file) {
            const updatedContent = editor?.getValue() || '';
            props.updateFile({
              ...props.file,
              content: updatedContent
            });
          }
        });
      }
    });

    // 监听文件变化
    watch(() => props.file?.id, () => {
      if (editor && props.file) {
        const currentModel = editor.getModel();
        const newModel = monaco.editor.createModel(
          props.file.content,
          props.file.language
        );

        editor.setModel(newModel);

        // 释放旧模型
        if (currentModel) {
          currentModel.dispose();
        }
      }
    });

    // 监听主题变化
    watch(() => props.isDarkTheme, (newTheme) => {
      const theme: Theme = newTheme ? 'vs-dark' : 'vs';
      monaco.editor.setTheme(theme);
    });

    // 监听设置变化
    watch(() => props.editorSettings, (newSettings) => {
      if (editor) {
        // 处理 Vim 模式的切换
        if (newSettings.vimMode && !vimMode && statusBarEl.value) {
          vimMode = initVimMode(editor, statusBarEl.value);
        } else if (!newSettings.vimMode && vimMode) {
          vimMode.dispose();
          vimMode = null;
        }

        editor.updateOptions({
          fontSize: newSettings.fontSize,
          lineNumbers: newSettings.lineNumbers ? 'on' : 'off',
          minimap: {
            enabled: newSettings.minimap
          },
          wordWrap: newSettings.wordWrap,
          tabSize: newSettings.tabSize
        });
      }
    }, { deep: true });

    // 组件卸载时清理
    onBeforeUnmount(() => {
      if (vimMode) {
        vimMode.dispose();
      }
      if (editor) {
        editor.dispose();
      }
    });

    return {
      monacoEl,
      statusBarEl
    };
  }
});
</script>
