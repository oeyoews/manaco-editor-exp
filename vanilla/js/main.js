// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
  // 默认设置
  const defaultSettings = {
    fontSize: 14,
    lineNumbers: true,
    minimap: true,
    wordWrap: 'off',
    tabSize: 2,
    theme: 'vs-dark'
  };

  // 当前活动文件
  let activeFile = null;
  // 编辑器实例
  let editor = null;

  // 初始化Monaco编辑器
  function initMonaco() {
    // 配置Monaco加载器
    require.config({
      paths: {
        'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.47.0/min/vs'
      }
    });

    // 加载编辑器
    require(['vs/editor/editor.main'], () => {
      // 创建编辑器实例
      editor = monaco.editor.create(document.getElementById('editor'), {
        value: '',
        language: 'plaintext',
        theme: defaultSettings.theme,
        automaticLayout: true,
        minimap: {
          enabled: defaultSettings.minimap
        },
        fontSize: defaultSettings.fontSize,
        lineNumbers: defaultSettings.lineNumbers ? 'on' : 'off',
        wordWrap: defaultSettings.wordWrap,
        tabSize: defaultSettings.tabSize,
        scrollBeyondLastLine: false,
        renderLineHighlight: 'all',
        suggestOnTriggerCharacters: true,
        quickSuggestions: true,
        snippetSuggestions: 'inline',
      });

      // 初始化文件选择器
      initFileSelector();

      // 加载示例文件
      loadSampleFiles();
    });
  }

  // 初始化文件选择器
  function initFileSelector() {
    const fileSelect = document.getElementById('file-select');

    // 清空现有选项
    fileSelect.innerHTML = '';

    // 添加示例文件选项
    sampleFiles.forEach(file => {
      const option = document.createElement('option');
      option.value = file.id;
      option.textContent = file.name;
      fileSelect.appendChild(option);
    });

    // 监听选择变化
    fileSelect.addEventListener('change', (e) => {
      const selectedId = e.target.value;
      const selectedFile = sampleFiles.find(file => file.id === selectedId);

      if (selectedFile) {
        activeFile = selectedFile;
        updateEditor(selectedFile);
      }
    });
  }

  // 加载示例文件
  function loadSampleFiles() {
    // 加载sampleFiles.js中的示例文件
    if (typeof sampleFiles !== 'undefined' && sampleFiles.length > 0) {
      // 默认加载第一个文件
      activeFile = sampleFiles[0];

      // 设置选择器默认值
      const fileSelect = document.getElementById('file-select');
      fileSelect.value = activeFile.id;

      // 更新编辑器
      updateEditor(activeFile);
    }
  }

  // 更新编辑器内容
  function updateEditor(file) {
    if (!file || !editor) return;

    // 更新编辑器内容和语言
    const model = monaco.editor.createModel(
      file.content,
      file.language
    );

    editor.setModel(model);

    // 监听编辑器内容变化
    editor.onDidChangeModelContent(() => {
      if (activeFile) {
        // 更新文件内容
        activeFile.content = editor.getValue();
      }
    });
  }

  // 初始化编辑器
  initMonaco();
});

// 添加主题切换功能
function addThemeToggle() {
  // 创建主题切换按钮
  const themeToggle = document.createElement('button');
  themeToggle.id = 'theme-toggle';
  themeToggle.textContent = '切换主题';
  themeToggle.style.position = 'absolute';
  themeToggle.style.top = '10px';
  themeToggle.style.left = '10px';
  themeToggle.style.zIndex = '1000';
  themeToggle.style.backgroundColor = '#333';
  themeToggle.style.color = '#fff';
  themeToggle.style.border = '1px solid #555';
  themeToggle.style.padding = '5px 10px';
  themeToggle.style.borderRadius = '3px';
  themeToggle.style.cursor = 'pointer';

  // 添加到文档
  document.body.appendChild(themeToggle);

  // 当前主题状态
  let isDarkTheme = true;

  // 添加点击事件
  themeToggle.addEventListener('click', () => {
    isDarkTheme = !isDarkTheme;
    const theme = isDarkTheme ? 'vs-dark' : 'vs';
    monaco.editor.setTheme(theme);
  });
}

// 页面加载完成后添加主题切换按钮
window.addEventListener('load', addThemeToggle);