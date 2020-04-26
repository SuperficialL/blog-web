const Hljs = require('highlight.js/lib/highlight');

Hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
Hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'));
Hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
Hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));
Hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
Hljs.registerLanguage('less', require('highlight.js/lib/languages/less'));
Hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'));
Hljs.registerLanguage('stylus', require('highlight.js/lib/languages/stylus'));
Hljs.registerLanguage('shell', require('highlight.js/lib/languages/shell'));
Hljs.registerLanguage('nginx', require('highlight.js/lib/languages/nginx'));
Hljs.registerLanguage('python', require('highlight.js/lib/languages/python'));
Hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
Hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'));

export default Hljs;