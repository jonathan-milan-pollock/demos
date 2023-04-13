Get-ChildItem -Path $env.windir\*.log | 
Select-String -List error | 
FormatTable Path.LineNumber -AutoSize

$powershellUrl = 'http://blogs.msdn.com/powershell/res.aspx'
 ([xml][System.Net.WebCpoient]::new().DownloadString()).svg.path |