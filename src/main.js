import '!style-loader!css-loader!sass-loader!./main.scss';

import ace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/keybinding/vim';

const editor = ace.edit('solution-editor');

editor.getSession().setMode('ace/mode/javascript');
editor.setTheme('ace/theme/chrome');
editor.clearSelection();

document.getElementById('submit').addEventListener('click', (event) => {
  event.preventDefault();

  // get the editor content (a string)
  const editorContent = editor.getValue();

  const EvalWorker = require('worker-loader?inline!./worker.js');
  const worker = new EvalWorker();
  worker.postMessage({ request: editorContent });
  worker.onmessage = event => {
    const data = event.data;
    const resultElement = document.getElementById('result');

    if (data.status === 'ok') {
      resultElement.textContent = data.response;
    }
  };
});
