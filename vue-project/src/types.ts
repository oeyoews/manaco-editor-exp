export interface File {
  id: string;
  name: string;
  language: string;
  content: string;
  path?: string;
}

export interface EditorSettings {
  fontSize: number;
  lineNumbers: boolean;
  minimap: boolean;
  wordWrap: 'off' | 'on' | 'wordWrapColumn' | 'bounded';
  tabSize: number;
  vimMode: boolean;
}

export type Theme = 'vs-dark' | 'vs';
