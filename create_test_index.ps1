$indexPath = "C:\Users\irons\.gemini\antigravity\scratch\subscription-store\index.html"
$testIndexPath = "C:\Users\irons\.gemini\antigravity\scratch\subscription-store\test_index.html"

$html = Get-Content -Path $indexPath -Raw

$headPatch = @"
<script>
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
</script>
"@

$html = $html.Replace("<head>", "<head>`n" + $headPatch)

$bodyPatch = @"
<div id="error-log-output"></div>
<script>
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('error-log-output').innerText = JSON.stringify(window.errorsLog);
    }, 1500);
});
</script>
"@

$html = $html.Replace("</body>", $bodyPatch + "`n</body>")

Set-Content -Path $testIndexPath -Value $html
Write-Host "test_index.html created successfully."
