import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import EditorPanel from './components/EditorPanel';
import { File, EditorSettings } from './types';
import { sampleFiles } from './data/sampleFiles';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [activeFile, setActiveFile] = useState<File | null>(sampleFiles[0]);
  const [files, setFiles] = useState<File[]>(sampleFiles);
  const [editorSettings, setEditorSettings] = useState<EditorSettings>({
    fontSize: 14,
    lineNumbers: true,
    minimap: true,
    wordWrap: 'off',
    tabSize: 2,
    vimMode: false,
  });

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const updateFile = (updatedFile: File) => {
    setFiles(files.map(file =>
      file.id === updatedFile.id ? updatedFile : file
    ));

    if (activeFile?.id === updatedFile.id) {
      setActiveFile(updatedFile);
    }
  };

  return (
    <div className={`h-screen flex flex-col ${isDarkTheme ? 'dark' : ''}`}>
      <Header
        isDarkTheme={isDarkTheme}
        toggleTheme={toggleTheme}
        activeFile={activeFile}
        editorSettings={editorSettings}
        setEditorSettings={setEditorSettings}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          files={files}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
          isDarkTheme={isDarkTheme}
        />
        <EditorPanel
          file={activeFile}
          updateFile={updateFile}
          isDarkTheme={isDarkTheme}
          editorSettings={editorSettings}
        />
      </div>
    </div>
  );
}

export default App;
