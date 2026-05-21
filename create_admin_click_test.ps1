$adminPath = "C:\Users\irons\.gemini\antigravity\scratch\subscription-store\admin.html"
$testAdminPath = "C:\Users\irons\.gemini\antigravity\scratch\subscription-store\test_admin_click.html"

$html = Get-Content -Path $adminPath -Raw

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
<div id="test-results" style="padding: 20px; background: rgba(0,0,0,0.8); color: white; font-family: monospace; font-size: 14px; position: fixed; bottom: 0; left: 0; right: 0; z-index: 999999;"></div>
<script>
window.addEventListener('load', () => {
    setTimeout(() => {
        try {
            const pinInput = document.getElementById('admin-pin');
            const submitBtn = document.getElementById('login-submit-btn');
            if (!pinInput) { window.errorsLog.push({ message: 'pinInput not found' }); }
            if (!submitBtn) { window.errorsLog.push({ message: 'submitBtn not found' }); }
            
            pinInput.value = 'love9002';
            
            // Trigger input/change event
            pinInput.dispatchEvent(new Event('input', { bubbles: true }));
            pinInput.dispatchEvent(new Event('change', { bubbles: true }));
            
            // Click the submit button
            submitBtn.click();
            
            setTimeout(() => {
                const gate = document.getElementById('admin-gate');
                const app = document.getElementById('admin-app');
                
                // Now let's try to click the Store Settings tab!
                const tabSettings = document.getElementById('tab-btn-settings');
                const panelSettings = document.getElementById('panel-settings');
                
                if (!tabSettings) { window.errorsLog.push({ message: 'tab-btn-settings not found' }); }
                if (!panelSettings) { window.errorsLog.push({ message: 'panel-settings not found' }); }
                
                if (tabSettings) tabSettings.click();
                
                setTimeout(() => {
                    const results = {
                        gateDisplay: gate ? gate.style.display : 'missing',
                        appDisplay: app ? app.style.display : 'missing',
                        settingsTabActive: tabSettings ? tabSettings.classList.contains('active') : false,
                        settingsPanelActive: panelSettings ? panelSettings.classList.contains('active') : false,
                        errors: window.errorsLog
                    };
                    const resDiv = document.getElementById('test-results');
                    resDiv.innerText = "TEST_RESULTS:" + JSON.stringify(results);
                }, 500);
            }, 500);
        } catch(e) {
            window.errorsLog.push({ message: e.message, stack: e.stack });
            document.getElementById('test-results').innerText = "TEST_RESULTS:" + JSON.stringify({ errors: window.errorsLog });
        }
    }, 500);
});
</script>
"@

$html = $html.Replace("</body>", $bodyPatch + "`n</body>")

Set-Content -Path $testAdminPath -Value $html
Write-Host "test_admin_click.html created successfully."
