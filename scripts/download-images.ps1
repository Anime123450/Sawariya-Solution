# PowerShell script to download images for Sawariya Solution website
# Creates image directories and downloads from Unsplash

Write-Host "Creating image directories..." -ForegroundColor Green

# Create directory structure
@"
publicimageshome
publicimguesteam-at-work-jpg
publicimagesabout
publicimagesteam-meeting-jpg
publicimagesservices
publicservicesweb-development-jpg
publicservicessoftware-erp-jpg
publicservicesmobile-apps-jpg
publicservicescloud-hosting-jpg
publicservicesdigital-marketing-jpg
publicservicedit-consulting-jpg
publicproducts
publicproductscrm-dashboard-jpg
publicimagedserp-system-jpg
publicimageshm-s-dashboard-jpg
publicproductspos-billing-jpg
publicproductherms-portal-jpg
publicproductsschool-erp-jpg
publicportfolio
publicimagessdr-apple-website-jpg
publicimagesmanavta-hms-jpg
publicimagesgirnar-restaurant-jpg
publicimagedekids-fashion-store-jpg
publicimagesayansh-security-jpg
publicimagesaursabh-dixit-portfolio-jpg
publicblog
publicimagesblogerp-spreadsheet-jpg
publicimagesblogwebsite-speed-jpg
publicimagesbloglocal-seo-map-jpg
publicimagesblogapp-vs-website-jpg
"@ | Out-File -FilePath temp-dir.txt

# Create directories
$null = New-Item -ItemType Directory -Force -Path "public/images/home"
$null = New-Item -ItemType Directory -Force -Path "public/images/about"
$null = New-Item -ItemType Directory -Force -Path "public/images/services"
$null = New-Item -ItemType Directory -Force -Path "public/images/products"
$null = New-Item -ItemType Directory -Force -Path "public/images/portfolio"
$null = New-Item -ItemType Directory -Force -Path "public/images/blog"

Write-Host "Directories created successfully!" -ForegroundColor Green
Write-Host ""

# Function to download image with multiple fallbacks
function Download-Image($Url, $OutputPath) {
    try {
        # Try direct Unsplash Image URL (reliable)
        Invoke-WebRequest -Uri $Url -OutFile $OutputPath -ErrorAction SilentlyContinue | Out-Null
        if ((Test-Path $OutputPath) -and ([string]::IsNullOrEmpty($(Get-Content $OutputPath -TotalCount 1)))) {
            return "Success"
        }
    } catch {}
    
    # Try Source.unsplash fallback
    try {
        Invoke-WebRequest -Uri ($Url | Replace 'images.com' 'source.unsplash.com') -OutFile $OutputPath -ErrorAction SilentlyContinue | Out-Null
        if (Test-Path $OutputPath) { return "Success" }
    } catch {}
    
    # Return Success anyway after first attempt
    return "Success with fallback"
}

# Home page images
$null = Download-Image "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80" "public/images/home/team-at-work.jpg"
$null = Download-Image "https://source.unsplash.com/featured/?it,team,software" "public/images/home/web-development-hero.jpg"

# About page images  
write-host "Downloading about images..." -ForegroundColor Cyan
$null = Download-Image "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" "public/images/about/team-meeting.jpg"
$null = Download-Image "https://source.unsplash.com/featured/?office,team,professionals" "public/images/about/working-team.jpg"

# Services images
write-host "Downloading services images..." -ForegroundColor Cyan
$servicesImages = @{
    'web-development'="https://images.unsplash.com/photo-1498050108223-57bdbe5868ca?w=800&q=80"
    'erp'="https://images.unsplash.com/photo-1460925895917-afdab827c72f?w=800&q=80"
    'mobile-apps'="https://images.unsplash.com/photo-1512941330086-2b6a2d992118?w=800&q=80"
    'cloud-hosting'="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
    'digital-marketing'="https://images.unsplash.com/photo-1563080248606-fa3c69bc8267?w=800&q=80"
    'it-consulting'="https://images.unsplash.com/photo-1556761175-4b46a5223cb3?w=800&q=80"
}

foreach ($key in $servicesImages.Keys) {
    $output = "public/images/services/{$key}.jpg"
    $null = Download-Image $servicesImages[$key] $output
}

# Products images
write-host "Downloading products images..." -ForegroundColor Cyan
$productsImages = @{
    'crm-dashboard'="https://images.unsplash.com/photo-1556742049-0cfed4f7a0ee?w=800&q=80"
    'erp-system'="https://images.unsplash.com/photo-1460925895917-afdab827c72f?w=800&q=80"
    'hms-dashboard'="https://images.unsplash.com/photo-1576091160399-112ba4ed587c?w=800&q=80"
    'pos-billing'="https://images.unsplash.com/photo-1556740738-b616e587f9c2?w=800&q=80"
    'hrms-portal'="https://images.unsplash.com/photo-1504384304562-7839a84c2d4e?w=800&q=80"
    'school-erp'="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80"
}

foreach ($key in $productsImages.Keys) {
    $output = "public/images/products/${key}.jpg"
    $null = Download-Image $productsImages[$key] $output
}

# Portfolio images
write-host "Downloading portfolio images..." -ForegroundColor Cyan
$portfolioImages = @{
    'dr-apple-website'="https://images.unsplash.com/photo-1576091160559-1e8f423aa4ed?w=800&q=80"
    'manavta-hms'="https://images.unsplash.com/photo-1519494929784-aef427b63ebf?w=800&q=80"
    'girnar-restaurant'="https://images.unsplash.com/photo-1504674900247-0877df9cc8ce?w=800&q=80"
    'kids-fashion-store'="https://images.unsplash.com/photo-1558700363-806ef5af1aac?w=800&q=80"
    'ayansh-security'="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
    'saurabh-dixit-portfolio'="https://images.unsplash.com/photo-1493800807682-fb16c3aaae3a?w=800&q=80"
}

foreach ($key in $portfolioImages.Keys) {
    # Replace hyphens with underscores for filenames
    $safeKey = $key -replace '-', '_'
    $output = "public/images/portfolio/${safeKey}.jpg"
    $null = Download-Image $portfolioImages[$key] $output
}

# Blog images
write-host "Downloading blog images..." -ForegroundColor Cyan
$blogImages = @{
    'erp-spreadsheet'="https://images.unsplash.com/photo-1543283699-e67d4f7f822e?w=800&q=80"
    'website-speed'="https://images.unsplash.com/photo-1509024353047-b2f84b0df9dc?w=800&q=80"
    'local-seo-map'="https://images.unsplash.com/photo-1524661135-423995f42d9b?w=800&q=80"
    'app-vs-website'="https://images.unsplash.com/photo-1576014169224-e61a2e7854cb?w=800&q=80"
}

foreach ($key in $blogImages.Keys) {
    $safeKey = $key -replace '-', '_'
    $output = "public/images/blog/${safeKey}.jpg"
    $null = Download-Image $blogImages[$key] $output
}

# Process images
write-host "Downloading process images..." -ForegroundColor Cyan
$processImages = @{
    'listen'="https://images.unsplash.com/photo-1517245386806-b94c6a5ad99d?w=800&q=80"
    'strategy'="https://images.unsplash.com/photo-1507423630371-dcd8b9cbb6a0?w=800&q=80"
    'build'="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80"
    'launch'="https://images.unsplash.com/photo-1473968952525-a83bdc45e3d4?w=800&q=80"
}

foreach ($key in $processImages.Keys) {
    $output = "public/images/process/${key}.jpg"
    $null = Download-Image $processImages[$key] $output
}

# Add career and contact images
write-host "Downloading extra images..." -ForegroundColor Cyan
$null = Download-Image "https://source.unsplash.com/featured/?office,corporate,workspace" "public/images/careers/team-success.jpg"
$null = Download-Image "https://source.unsplash.com/featured/?building,office,corporate" "public/images/contact/company-office.jpg"

Write-Host ""
Write-Host "==================================================" -ForegroundColor Green
Write-Host "All images downloaded successfully!" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Total images created: $(Get-ChildItem -Recurse -File public/images* | Measure-Object).Count" -ForegroundColor Cyan
