import { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import { initVimMode } from 'monaco-vim';
import { File, EditorSettings, Theme } from '../types';
import { getLanguageSnippets } from '../utils/snippets';

interface EditorPanelProps {
  file: File | null;
  updateFile: (file: File) => void;
  isDarkTheme: boolean;
  editorSettings: EditorSettings;
}

const EditorPanel = ({ file, updateFile, isDarkTheme, editorSettings }: EditorPanelProps) => {
  const monacoEl = useRef<HTMLDivElement>(null);
  const statusBarEl = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const vimModeRef = useRef<any>(null);

  // Initialize editor when component mounts
  useEffect(() => {
    if (monacoEl.current) {
      // Configure snippets for the current language
      if (file) {
        monaco.languages.registerCompletionItemProvider(file.language, {
          provideCompletionItems: (model, position) => {
            const snippets = getLanguageSnippets(file.language);
            const word = model.getWordUntilPosition(position);
            const range = {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: word.startColumn,
              endColumn: word.endColumn
            };

            return {
              suggestions: snippets.map(snippet => ({
                label: snippet.prefix,
                kind: monaco.languages.CompletionItemKind.Snippet,
                documentation: snippet.description,
                insertText: snippet.body,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range
              }))
            };
          }
        });
      }

      editorRef.current = monaco.editor.create(monacoEl.current, {
        value: file?.content || '',
        language: file?.language || 'plaintext',
        theme: isDarkTheme ? 'vs-dark' : 'vs',
        automaticLayout: true,
        minimap: {
          enabled: editorSettings.minimap
        },
        fontSize: editorSettings.fontSize,
        lineNumbers: editorSettings.lineNumbers ? 'on' : 'off',
        wordWrap: editorSettings.wordWrap,
        tabSize: editorSettings.tabSize,
        scrollBeyondLastLine: false,
        renderLineHighlight: 'all',
        suggestOnTriggerCharacters: true,
        quickSuggestions: true,
        snippetSuggestions: 'inline',
      });

      // 初始化 Vim 模式
      if (statusBarEl.current && editorSettings.vimMode) {
        vimModeRef.current = initVimMode(editorRef.current, statusBarEl.current);
      }

      // Update file content when editor content changes
      editorRef.current.onDidChangeModelContent(() => {
        if (file) {
          const updatedContent = editorRef.current?.getValue() || '';
          updateFile({
            ...file,
            content: updatedContent
          });
        }
      });

      // Cleanup on unmount
      return () => {
        if (vimModeRef.current) {
          vimModeRef.current.dispose();
        }
        editorRef.current?.dispose();
      };
    }
  }, []);

  // Update editor when file changes
  useEffect(() => {
    if (editorRef.current && file) {
      const currentModel = editorRef.current.getModel();
      const newModel = monaco.editor.createModel(
        file.content,
        file.language
      );

      editorRef.current.setModel(newModel);

      // Dispose old model
      if (currentModel) {
        currentModel.dispose();
      }
    }
  }, [file?.id]);

  // Update editor theme when theme changes
  useEffect(() => {
    const theme: Theme = isDarkTheme ? 'vs-dark' : 'vs';
    monaco.editor.setTheme(theme);
  }, [isDarkTheme]);

  // Update editor settings when settings change
  useEffect(() => {
    if (editorRef.current) {
      // 处理 Vim 模式的切换
      if (editorSettings.vimMode && !vimModeRef.current && statusBarEl.current) {
        vimModeRef.current = initVimMode(editorRef.current, statusBarEl.current);
      } else if (!editorSettings.vimMode && vimModeRef.current) {
        vimModeRef.current.dispose();
        vimModeRef.current = null;
      }

      editorRef.current.updateOptions({
        fontSize: editorSettings.fontSize,
        lineNumbers: editorSettings.lineNumbers ? 'on' : 'off',
        minimap: {
          enabled: editorSettings.minimap
        },
        wordWrap: editorSettings.wordWrap,
        tabSize: editorSettings.tabSize
      });
    }
  }, [editorSettings]);

  return (
    <div className={`flex-1 overflow-hidden flex flex-col ${
      isDarkTheme ? 'bg-editor-dark' : 'bg-editor-light'
    }`}>
      {file ? (
        <>
          <div className="h-full flex-1" ref={monacoEl}></div>
          <div
            ref={statusBarEl}
            className={`h-6 px-2 text-xs flex items-center ${
              isDarkTheme ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
            }`}
          ></div>
        </>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-500">
          <p>选择一个文件进行编辑</p>
        </div>
      )}
    </div>
  );
};

export default EditorPanel;
