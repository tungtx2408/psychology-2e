param([ValidateSet('start','dev','build','test','verify')][string]$Action = 'start')
$ErrorActionPreference = 'Stop'
$projectDir = $PSScriptRoot
$nodeCommand = Get-Command node.exe -ErrorAction SilentlyContinue
$bundledBase = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node'
if ($nodeCommand) { $nodeExe = $nodeCommand.Source }
elseif (Test-Path -LiteralPath (Join-Path $bundledBase 'bin\node.exe')) { $nodeExe = Join-Path $bundledBase 'bin\node.exe' }
else { throw 'Chua tim thay Node.js. Hay cai Node.js 24 kem npm roi mo lai.' }
$env:PATH = (Split-Path $nodeExe) + [IO.Path]::PathSeparator + $env:PATH
$pnpmCommand = Get-Command pnpm.cmd -ErrorAction SilentlyContinue
$npxCommand = Get-Command npx.cmd -ErrorAction SilentlyContinue
$bundledPnpm = Join-Path $bundledBase 'node_modules\pnpm\bin\pnpm.cjs'
function Invoke-ProjectManager {
  param([string[]]$TaskArgs)
  if ($pnpmCommand) { & $pnpmCommand.Source @TaskArgs }
  elseif (Test-Path -LiteralPath $bundledPnpm) { & $nodeExe $bundledPnpm @TaskArgs }
  elseif ($npxCommand) { & $npxCommand.Source --yes pnpm@11.25.0 @TaskArgs }
  else { throw 'Can pnpm hoac npm/npx. Hay cai Node.js LTS kem npm, roi mo lai.' }
  if ($LASTEXITCODE -ne 0) { throw "Lenh thuc thi that bai (exit code $LASTEXITCODE). Xem thong bao phia tren." }
}
Push-Location -LiteralPath $projectDir
try {
  if (-not (Test-Path -LiteralPath 'node_modules\vitepress\bin\vitepress.js')) { Invoke-ProjectManager -TaskArgs @('install','--frozen-lockfile') }
  switch ($Action) {
    'start' {
      Invoke-ProjectManager -TaskArgs @('run','build')
      & $nodeExe 'scripts\verify-build.mjs'
      if ($LASTEXITCODE -ne 0) { throw 'Kiem tra ban web chua dat.' }
      & $nodeExe 'scripts\serve.mjs' '--open'
      if ($LASTEXITCODE -ne 0) { throw 'Khong khoi dong duoc trinh doc.' }
    }
    'dev' { Invoke-ProjectManager -TaskArgs @('run','dev') }
    'build' { Invoke-ProjectManager -TaskArgs @('run','build') }
    'test' { Invoke-ProjectManager -TaskArgs @('run','test') }
    'verify' { Invoke-ProjectManager -TaskArgs @('run','verify') }
  }
}
finally { Pop-Location }
