interface Snippet {
  prefix: string;
  body: string;
  description: string;
}

export function getLanguageSnippets(language: string): Snippet[] {
  switch (language) {
    case 'javascript':
    case 'typescript':
      return [
        {
          prefix: 'log',
          body: 'console.log($1);',
          description: 'Log to the console'
        },
        {
          prefix: 'fn',
          body: 'function ${1:name}(${2:params}) {\n\t$0\n}',
          description: 'Create a function'
        },
        {
          prefix: 'afn',
          body: 'async function ${1:name}(${2:params}) {\n\t$0\n}',
          description: 'Create an async function'
        },
        {
          prefix: 'arr',
          body: '(${1:params}) => $0',
          description: 'Create an arrow function'
        },
        {
          prefix: 'if',
          body: 'if (${1:condition}) {\n\t$0\n}',
          description: 'Create an if statement'
        }
      ];
    case 'html':
      return [
        {
          prefix: 'html',
          body: '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>${1:Document}</title>\n</head>\n<body>\n\t$0\n</body>\n</html>',
          description: 'HTML5 template'
        },
        {
          prefix: 'div',
          body: '<div class="$1">\n\t$0\n</div>',
          description: 'Create a div with class'
        }
      ];
    case 'css':
      return [
        {
          prefix: 'flex',
          body: 'display: flex;\njustify-content: ${1:center};\nalign-items: ${2:center};',
          description: 'Flexbox layout'
        },
        {
          prefix: 'grid',
          body: 'display: grid;\ngrid-template-columns: ${1:repeat(3, 1fr)};\ngap: ${2:1rem};',
          description: 'Grid layout'
        }
      ];
    default:
      return [];
  }
}
