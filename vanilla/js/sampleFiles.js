// 示例文件数据
const sampleFiles = [
  {
    id: '1',
    name: 'main.js',
    language: 'javascript',
    content: `// Welcome to Monaco Editor
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Try to edit this function
function calculateSum(a, b) {
  return a + b;
}

// This is an async function example
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// DOM manipulation
document.addEventListener('DOMContentLoaded', () => {
  const result = calculateSum(5, 10);
  console.log(\`The sum is: \${result}\`);
  console.log(greet('Developer'));
});`,
    path: '/js/main.js'
  },
  {
    id: '2',
    name: 'styles.css',
    language: 'css',
    content: `/* Basic CSS example */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

/* Header styles */
header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem 0;
}

header h1 {
  margin: 0;
  font-size: 1.8rem;
}`,
    path: '/css/styles.css'
  },
  {
    id: '3',
    name: 'index.html',
    language: 'html',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Monaco Editor Example</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header>
    <div class="container">
      <h1>Monaco Editor Example</h1>
    </div>
  </header>
  
  <main class="container">
    <div id="editor-container">
      <!-- Monaco Editor will be mounted here -->
    </div>
    
    <div class="controls">
      <button class="btn" id="run-btn">Run Code</button>
      <button class="btn" id="clear-btn">Clear Console</button>
    </div>
    
    <div class="output-container">
      <h2>Console Output</h2>
      <pre id="output"></pre>
    </div>
  </main>
  
  <script src="main.js"></script>
</body>
</html>`,
    path: '/index.html'
  },
  {
    id: '4',
    name: 'data.json',
    language: 'json',
    content: `{
  "name": "Monaco Editor Example",
  "version": "1.0.0",
  "description": "A sample application showcasing Monaco Editor",
  "author": {
    "name": "Developer",
    "email": "dev@example.com"
  },
  "dependencies": {
    "monaco-editor": "^0.47.0"
  },
  "features": [
    "Syntax highlighting",
    "Code completion",
    "Error checking",
    "Multiple language support",
    "Theme customization"
  ],
  "settings": {
    "editor": {
      "fontFamily": "Consolas, 'Courier New', monospace",
      "fontSize": 14,
      "lineHeight": 1.5,
      "tabSize": 2,
      "insertSpaces": true,
      "wordWrap": "off",
      "minimap": {
        "enabled": true
      },
      "theme": "vs-dark"
    }
  }
}`,
    path: '/data/data.json'
  }
];
