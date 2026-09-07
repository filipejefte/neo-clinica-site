# Renderiza a imagem de compartilhamento (Open Graph, 1200x630) e o ícone
# (512x512) a partir de tools/og.html e tools/icone.html, com o Chrome em modo
# headless. Sobe um servidor estático temporário porque as páginas usam a
# folha de estilo e as fontes do site, que não carregam via file://.
#
#   powershell -ExecutionPolicy Bypass -File tools\imagens.ps1

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$chrome = Join-Path $env:ProgramFiles 'Google\Chrome\Application\chrome.exe'
if (-not (Test-Path $chrome)) { throw "Chrome não encontrado em $chrome" }
$port = 5181
$img = Join-Path $root 'assets\img'
New-Item -ItemType Directory -Force $img | Out-Null

$srv = Start-Process python -ArgumentList '-m', 'http.server', "$port", '--bind', '127.0.0.1', '--directory', $root -PassThru -WindowStyle Hidden
Start-Sleep -Seconds 2

function Render($pagina, $w, $h, $saida, $tag) {
  # Um perfil novo por captura: reaproveitar o mesmo trava a chamada seguinte.
  $perfil = Join-Path $PSScriptRoot "chrome-profile-$tag"
  if (Test-Path $perfil) { Remove-Item -Recurse -Force $perfil }
  & $chrome --headless=new --disable-gpu --hide-scrollbars "--window-size=$w,$h" `
    --virtual-time-budget=12000 "--user-data-dir=$perfil" "--screenshot=$saida" `
    "http://127.0.0.1:$port/tools/$pagina"
  # O lançador retorna antes de o PNG existir: esperar o Chrome desta captura encerrar.
  for ($i = 0; $i -lt 80; $i++) {
    Start-Sleep -Milliseconds 500
    $vivo = Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" | Where-Object { $_.CommandLine -like "*chrome-profile-$tag*" }
    if (-not $vivo) { break }
  }
  Start-Sleep -Milliseconds 500
  Remove-Item -Recurse -Force $perfil -ErrorAction SilentlyContinue
  if (-not (Test-Path $saida) -or (Get-Item $saida).Length -lt 1000) { throw "Falha ao renderizar $pagina" }
}

try {
  Render 'og.html' 1200 630 (Join-Path $img 'og.png') 'og'
  Render 'icone.html' 512 512 (Join-Path $img 'icone-512.png') 'icone'
} finally {
  Stop-Process -Id $srv.Id -Force -ErrorAction SilentlyContinue
}
Get-ChildItem $img | Select-Object Name, Length
