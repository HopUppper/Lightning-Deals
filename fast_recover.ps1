# Fast PowerShell script to scan Chrome and Edge LevelDB for product catalog fragments
$paths = @(
    "C:\Users\irons\AppData\Local\Google\Chrome\User Data\Default\Local Storage\leveldb",
    "C:\Users\irons\AppData\Local\Microsoft\Edge\User Data\Default\Local Storage\leveldb"
)
$tempDir = "C:\Users\irons\.gemini\antigravity\scratch\subscription-store\recovery_temp"
$outFile = "C:\Users\irons\.gemini\antigravity\scratch\subscription-store\recovered_data_dump.txt"

if (-not (Test-Path $tempDir)) {
    New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
}

$foundItems = [System.Collections.Generic.List[string]]::new()
$jsonArrays = [System.Collections.Generic.List[string]]::new()

foreach ($dbPath in $paths) {
    if (-not (Test-Path $dbPath)) {
        Write-Host "Path does not exist: $dbPath" -ForegroundColor Yellow
        continue
    }
    
    Write-Host "Scanning database path: $dbPath" -ForegroundColor Cyan
    # Copy files to avoid locks
    $tempDbDir = Join-Path $tempDir (Split-Path (Split-Path $dbPath -Parent) -Leaf)
    if (-not (Test-Path $tempDbDir)) { New-Item -ItemType Directory -Path $tempDbDir -Force | Out-Null }
    Copy-Item -Path "$dbPath\*" -Destination $tempDbDir -Force
    
    $files = Get-ChildItem -Path $tempDbDir -File
    foreach ($file in $files) {
        if ($file.Name -eq "LOCK") { continue }
        
        try {
            $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
            # Interpret as UTF-8/ASCII
            $text = [System.Text.Encoding]::UTF8.GetString($bytes)
            
            # 1. Search for JSON arrays containing our product fields
            # We match bracketed structures that contain product fields like "activationProcess", "plans", etc.
            # Use regex to find potential JSON arrays that contain "plans" or "activationProcess"
            $matches = [regex]::Matches($text, '\[\s*\{\s*"[^"]+"\s*:\s*.*?\}\s*\]', [System.Text.RegularExpressions.RegexOptions]::Singleline)
            foreach ($match in $matches) {
                $val = $match.Value
                if ($val -like '*activationProcess*' -or $val -like '*plans*' -or $val -like '*retail*') {
                    $jsonArrays.Add($val)
                }
            }
            
            # 2. Also search for any large JSON-like string if brace matching works
            $idx = $text.IndexOf("activationProcess")
            while ($idx -ne -1) {
                # Look backward for [ and forward for ] to extract the whole array
                $start = [math]::Max(0, $idx - 5000)
                $len = [math]::Min(100000, $text.Length - $start)
                $chunk = $text.Substring($start, $len)
                
                # Try to extract matching bracket from first [ to last ]
                $firstBracket = $chunk.IndexOf("[")
                if ($firstBracket -ne -1) {
                    $bracketCount = 0
                    $braceCount = 0
                    $jsonString = ""
                    $started = $false
                    
                    for ($i = $firstBracket; $i -lt $chunk.Length; $i++) {
                        $char = $chunk[$i]
                        $jsonString += $char
                        if ($char -eq '[') { $bracketCount++; $started = $true }
                        elseif ($char -eq ']') { $bracketCount-- }
                        elseif ($char -eq '{') { $braceCount++ }
                        elseif ($char -eq '}') { $braceCount-- }
                        
                        if ($started -and $bracketCount -eq 0 -and $braceCount -eq 0) {
                            if ($jsonString -like '*activationProcess*' -and $jsonString -like '*plans*') {
                                $jsonArrays.Add($jsonString)
                            }
                            break
                        }
                    }
                }
                
                $idx = $text.IndexOf("activationProcess", $idx + 1)
            }
            
            # 3. Fallback: Extract ASCII strings of length 15+ containing relevant keywords
            $asciiMatches = [regex]::Matches($text, '[\x20-\x7E]{15,}')
            foreach ($match in $asciiMatches) {
                $val = $match.Value
                if ($val -like '*lightning_deals*' -or $val -like '*plans*' -or $val -like '*retail*' -or $val -like '*activationProcess*' -or $val -like '*activationRequirements*') {
                    $foundItems.Add("[$($file.Name)] $val")
                }
            }
        } catch {
            Write-Host "Error scanning $($file.Name): $_" -ForegroundColor Red
        }
    }
}

# Clean up temp files
Remove-Item -Path $tempDir -Recurse -Force -ErrorAction SilentlyContinue | Out-Null

# Save JSON arrays
$uniqueJSON = $jsonArrays | Select-Object -Unique
$uniqueStrings = $foundItems | Select-Object -Unique

$outputLines = @()
$outputLines += "=== UNIQUE RECOVERED JSON ARRAYS ==="
$outputLines += "Found Count: $($uniqueJSON.Count)"
foreach ($json in $uniqueJSON) {
    $outputLines += "--- ARRAY START ---"
    $outputLines += $json
    $outputLines += "--- ARRAY END ---"
}
$outputLines += "`n=== UNIQUE RECOVERED KEYWORD STRINGS ==="
$outputLines += $uniqueStrings

$outputLines | Out-File -FilePath $outFile -Encoding utf8
Write-Host "Fast scan finished. Output written to $outFile" -ForegroundColor Green
Write-Host "Found $($uniqueJSON.Count) potential product arrays and $($uniqueStrings.Count) keyword-related strings." -ForegroundColor Green
