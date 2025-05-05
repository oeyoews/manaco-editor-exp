import { File, FileText, Code } from 'lucide-react';
import { File as FileType } from '../types';

interface SidebarProps {
  files: FileType[];
  activeFile: FileType | null;
  setActiveFile: (file: FileType) => void;
  isDarkTheme: boolean;
}

const Sidebar = ({ files, activeFile, setActiveFile, isDarkTheme }: SidebarProps) => {
  const getFileIcon = (language: string) => {
    switch (language) {
      case 'javascript':
        return <Code size={16} />;
      case 'typescript':
        return <Code size={16} className="text-blue-500" />;
      case 'html':
        return <Code size={16} className="text-orange-500" />;
      case 'css':
        return <Code size={16} className="text-purple-500" />;
      case 'json':
        return <FileText size={16} className="text-yellow-500" />;
      default:
        return <File size={16} />;
    }
  };

  return (
    <aside 
      className={`w-56 flex-shrink-0 overflow-y-auto transition-all duration-200 ${
        isDarkTheme 
          ? 'bg-editor-sidebar-dark text-gray-300' 
          : 'bg-editor-sidebar-light text-gray-700'
      }`}
    >
      <div className="p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider mb-3 opacity-70">
          Explorer
        </h2>
        
        <div className="space-y-1">
          {files.map(file => (
            <button
              key={file.id}
              onClick={() => setActiveFile(file)}
              className={`w-full text-left px-2 py-1.5 rounded flex items-center text-sm transition-colors ${
                activeFile?.id === file.id 
                  ? isDarkTheme 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-gray-200 text-gray-900'
                  : isDarkTheme
                    ? 'hover:bg-gray-700/50' 
                    : 'hover:bg-gray-200/50'
              }`}
            >
              <span className="mr-2">{getFileIcon(file.language)}</span>
              <span className="truncate">{file.name}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;