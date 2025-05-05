import { useState } from 'react';
import { Moon, Sun, Settings, Command, Save } from 'lucide-react';
import { File, EditorSettings } from '../types';
import SettingsModal from './SettingsModal';

interface HeaderProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
  activeFile: File | null;
  editorSettings: EditorSettings;
  setEditorSettings: (settings: EditorSettings) => void;
}

const Header = ({ 
  isDarkTheme, 
  toggleTheme, 
  activeFile, 
  editorSettings,
  setEditorSettings
}: HeaderProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <header className={`h-12 flex items-center justify-between px-4 ${
      isDarkTheme 
        ? 'bg-editor-header-dark text-white border-b border-gray-700' 
        : 'bg-editor-header-light text-gray-800 border-b border-gray-300'
    }`}>
      <div className="flex items-center space-x-4">
        <div className="text-lg font-medium">Monaco Editor</div>
        <div className="hidden md:flex items-center space-x-2 text-sm">
          {activeFile && (
            <span className="opacity-70">{activeFile.path}</span>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button 
          className="p-1.5 rounded-md transition-colors hover:bg-opacity-20 hover:bg-gray-500"
          title="Command Palette (Ctrl+Shift+P)"
        >
          <Command size={18} />
        </button>
        
        <button 
          className="p-1.5 rounded-md transition-colors hover:bg-opacity-20 hover:bg-gray-500" 
          onClick={() => setIsSettingsOpen(true)}
          title="Editor Settings"
        >
          <Settings size={18} />
        </button>
        
        <button 
          className="p-1.5 rounded-md transition-colors hover:bg-opacity-20 hover:bg-gray-500"
          title="Save File (Ctrl+S)"
        >
          <Save size={18} />
        </button>

        <button 
          className="p-1.5 rounded-md transition-colors hover:bg-opacity-20 hover:bg-gray-500" 
          onClick={toggleTheme}
          title={isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"}
        >
          {isDarkTheme ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {isSettingsOpen && (
        <SettingsModal 
          settings={editorSettings}
          onSave={(newSettings) => {
            setEditorSettings(newSettings);
            setIsSettingsOpen(false);
          }}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;