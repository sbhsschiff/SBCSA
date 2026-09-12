# Decodes a HEIC file to PNG using the Windows HEIF codec (WIC).
#
# sharp's prebuilt libheif ships without an HEVC decoder, so it can read HEIC
# container metadata but not the pixels. Windows can, so build-gallery.mjs routes
# HEIC files through here first.

param(
    [Parameter(Mandatory = $true)][string]$Source,
    [Parameter(Mandatory = $true)][string]$Destination
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName PresentationCore

$stream = [System.IO.File]::OpenRead($Source)
try {
    $decoder = [System.Windows.Media.Imaging.BitmapDecoder]::Create($stream, 'None', 'OnLoad')
    $encoder = New-Object System.Windows.Media.Imaging.PngBitmapEncoder
    $encoder.Frames.Add($decoder.Frames[0])

    $output = [System.IO.File]::Create($Destination)
    try { $encoder.Save($output) } finally { $output.Close() }
} finally {
    $stream.Close()
}
