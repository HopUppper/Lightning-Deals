$indexPath = "C:\Users\irons\.gemini\antigravity\scratch\subscription-store\index.html"
$testSuggestionsPath = "C:\Users\irons\.gemini\antigravity\scratch\subscription-store\test_suggestions.html"

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
<div id="test-results" style="padding: 20px; background: rgba(0,0,0,0.8); color: white; font-family: monospace; font-size: 14px; position: fixed; bottom: 0; left: 0; right: 0; z-index: 999999;"></div>
<script>
window.addEventListener('load', () => {
    setTimeout(() => {
        try {
            const searchInput = document.getElementById('store-search-input');
            const suggestions = document.getElementById('search-suggestions');
            
            if (!searchInput) { window.errorsLog.push({ message: 'store-search-input not found' }); }
            if (!suggestions) { window.errorsLog.push({ message: 'search-suggestions not found' }); }
            
            // 1. Simulate typing "Canva"
            searchInput.value = 'Canva';
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            searchInput.dispatchEvent(new Event('change', { bubbles: true }));
            
            setTimeout(() => {
                const suggestionItems = suggestions.querySelectorAll('.suggestion-item');
                const suggestionsCount = suggestionItems.length;
                
                // Get the first suggestion name
                let firstSuggestionText = '';
                if (suggestionsCount > 0) {
                    const nameEl = suggestionItems[0].querySelector('.suggestion-name');
                    if (nameEl) firstSuggestionText = nameEl.innerText;
                    
                    // Click the first suggestion
                    suggestionItems[0].click();
                }
                
                setTimeout(() => {
                    // Check if input value changed and dropdown closed
                    const finalInputValue = searchInput.value;
                    const dropdownClosed = !suggestions.classList.contains('show');
                    
                    // Test desktop filters clicking
                    const filterBtn = document.querySelector('#category-filters-container .filter-btn[data-category="design"]');
                    let filterBtnClicked = false;
                    if (filterBtn) {
                        filterBtn.click();
                        filterBtnClicked = true;
                    }
                    
                    setTimeout(() => {
                        const results = {
                            suggestionsCount: suggestionsCount,
                            firstSuggestionText: firstSuggestionText,
                            finalInputValue: finalInputValue,
                            dropdownClosed: dropdownClosed,
                            filterBtnClicked: filterBtnClicked,
                            currentCategory: currentCategory,
                            errors: window.errorsLog
                        };
                        document.getElementById('test-results').innerText = "TEST_RESULTS:" + JSON.stringify(results);
                    }, 500);
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

Set-Content -Path $testSuggestionsPath -Value $html
Write-Host "test_suggestions.html created successfully."
