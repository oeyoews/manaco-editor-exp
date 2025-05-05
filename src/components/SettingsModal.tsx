import { useState } from 'react';
import { EditorSettings } from '../types';
import { X } from 'lucide-react';

interface SettingsModalProps {
  settings: EditorSettings;
  onSave: (settings: EditorSettings) => void;
  onClose: () => void;
}

const SettingsModal = ({ settings, onSave, onClose }: SettingsModalProps) => {
  const [localSettings, setLocalSettings] = useState<EditorSettings>({...settings});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setLocalSettings({
        ...localSettings,
        [name]: checked,
      });
    } else if (type === 'number') {
      setLocalSettings({
        ...localSettings,
        [name]: parseInt(value, 10),
      });
    } else {
      setLocalSettings({
        ...localSettings,
        [name]: value,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Editor Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Font Size
            </label>
            <input
              type="number"
              name="fontSize"
              value={localSettings.fontSize}
              onChange={handleChange}
              min={8}
              max={32}
              className="w-full px-3 py-2 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="lineNumbers"
              name="lineNumbers"
              checked={localSettings.lineNumbers}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="lineNumbers" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Show Line Numbers
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="minimap"
              name="minimap"
              checked={localSettings.minimap}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="minimap" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Show Minimap
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Word Wrap
            </label>
            <select
              name="wordWrap"
              value={localSettings.wordWrap}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="off">Off</option>
              <option value="on">On</option>
              <option value="wordWrapColumn">Word Wrap Column</option>
              <option value="bounded">Bounded</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tab Size
            </label>
            <input
              type="number"
              name="tabSize"
              value={localSettings.tabSize}
              onChange={handleChange}
              min={1}
              max={8}
              className="w-full px-3 py-2 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="vimMode"
              name="vimMode"
              checked={localSettings.vimMode}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="vimMode" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              启用 Vim 模式
            </label>
          </div>
        </div>

        <div className="flex justify-end p-4 border-t dark:border-gray-700">
          <button
            onClick={() => onClose()}
            className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(localSettings)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
