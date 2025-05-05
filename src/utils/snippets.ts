interface Snippet {
  prefix: string;
  body: string;
  description: string;
}

const javascriptSnippets: Snippet[] = [
  {
    prefix: 'cl',
    body: 'console.log($1);',
    description: 'Console log statement'
  },
  {
    prefix: 'fn',
    body: 'function ${1:name}(${2:params}) {\n\t${3}\n}',
    description: 'Function declaration'
  },
  {
    prefix: 'afn',
    body: 'async function ${1:name}(${2:params}) {\n\ttry {\n\t\t${3}\n\t} catch (error) {\n\t\tconsole.error(error);\n\t}\n}',
    description: 'Async function with try-catch'
  },
  {
    prefix: 'arr',
    body: 'const ${1:array} = [${2}];',
    description: 'Array declaration'
  }
];

const typescriptSnippets: Snippet[] = [
  ...javascriptSnippets,
  {
    prefix: 'int',
    body: 'interface ${1:Name} {\n\t${2}\n}',
    description: 'Interface declaration'
  },
  {
    prefix: 'type',
    body: 'type ${1:Name} = ${2:Type};',
    description: 'Type declaration'
  }
];

const htmlSnippets: Snippet[] = [
  {
    prefix: 'div',
    body: '<div className="${1:class}">\n\t${2}\n</div>',
    description: 'Div with className'
  },
  {
    prefix: 'btn',
    body: '<button\n\tclassName="${1:class}"\n\tonClick={() => ${2}}\n>\n\t${3:Button Text}\n</button>',
    description: 'Button with onClick handler'
  }
];

const cssSnippets: Snippet[] = [
  {
    prefix: 'flex',
    body: 'display: flex;\njustify-content: ${1:center};\nalign-items: ${2:center};',
    description: 'Flexbox layout'
  },
  {
    prefix: 'grid',
    body: 'display: grid;\ngrid-template-columns: ${1:repeat(auto-fit, minmax(200px, 1fr))};\ngap: ${2:1rem};',
    description: 'CSS Grid layout'
  }
];

export const getLanguageSnippets = (language: string): Snippet[] => {
  switch (language) {
    case 'javascript':
      return javascriptSnippets;
    case 'typescript':
      return typescriptSnippets;
    case 'html':
      return htmlSnippets;
    case 'css':
      return cssSnippets;
    default:
      return [];
  }
};