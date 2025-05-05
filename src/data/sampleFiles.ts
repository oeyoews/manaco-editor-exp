import { File } from '../types';

export const sampleFiles: File[] = [
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
}

/* Button styles */
.btn {
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #2980b9;
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
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <div class="container">
      <h1>Monaco Editor Demo</h1>
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
    name: 'App.tsx',
    language: 'typescript',
    content: `import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="app">
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;`,
    path: '/src/App.tsx'
  },
  {
    id: '5',
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
    "monaco-editor": "^0.47.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
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