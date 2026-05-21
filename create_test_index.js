const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
const testIndexPath = path.join(__dirname, 'test_index.html');

let html = fs.readFileSync(indexPath, 'utf8');

const headPatch = `<script>
window.errorsLog = [];
window.onerror = function(message, source, lineno, colno, error) {
    window.errorsLog.push({
        message: message,
        source: source,
        lineno: lineno,
        colno: colno,
        stack: error ? error.stack : ''
    });
    return false;
};
</script>`;

html = html.replace('<head>', '<head>\n' + headPatch);

const bodyPatch = `<div id="error-log-output"></div>
<script>
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('error-log-output').innerText = JSON.stringify(window.errorsLog);
    }, 1500);
});
</script>`;

html = html.replace('</body>', bodyPatch + '\n</body>');

fs.writeFileSync(testIndexPath, html, 'utf8');
console.log('test_index.html created successfully.');
