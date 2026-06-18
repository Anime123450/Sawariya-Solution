@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo =========================================
echo   Sawariya Solution Image Downloader
echo =========================================
echo.

REM Create directory structure
echo "Creating directories..."
if not exist public\images\home mkdir public\images\home
if not exist public\images\about mkdir public\images\about
if not exist public\images\services mkdir public\images\services
if not exist public\images\products mkdir public\images\products
if not exist public\images/portfolio mkdir public\images\portfolio
if not exist public\images/blog mkdir public\images\blog
if not exist public\images\process mkdir public\images\process

echo "Directories created!"
echo.

REM Function to download image with multiple fallbacks
download-image() {
    set "url=%1"
    set "output=%2"
    set "alt=%3"
    
    try {
        (curl -o "!output!" -w "%{http_code}" "!url! 2>nul) >urlcode.tmp
        for /f "usebackq tokens=*" %%i in ('type urlcode.tmp') do set httpcode=%%i
        del urlcode.tmp >nul 2>&1
        
        if "!httpcode!"=="200" (
            echo [OK] !alt! - Downloaded from Unsplash Main
            goto :EOF
        ) else if "!httpcode!"=="301" or "!httpcode!"=="302" (
            REM Try with source.unsplash.com alternative URL
            curl -o "!output!" "https://source.unsplash.com/featured/?!alt!" >nul 2>&1
            echo [OK] !alt! - Downloaded from alternate source
        ) else if not exist "!output!" (
            echo [WARN] !alt! - Failed to download
        ) else (
            echo [OK] !alt! - Already exists or downloaded
        )
    } catch {
        echo [ERROR] Failed to process image for: !alt!
    }
}

echo "Downloading Home Page images..."
download-image "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop&q=80" "public/images/home/team-at-work.jpg" "team at work"
curl -o "public/images/home/web-development-hero.jpg" "https://source.unsplash.com/featured/?it,team,software" 2>nul || echo [WARN] Failed to download web development hero image

echo "Downloading About Page images..."
download-image "https://images.unsplash.com/photo-1522071820081-0cf4c96f8a3e?w=800&h=500&fit=crop&q=80" "public/images/about/team-meeting.jpg" "team meeting"
curl -o "public/images/about/working-team.jpg" "https://source.unsplash.com/featured/?office,team,professionals" 2>nul || echo [WARN] Failed to download working team image

echo "Downloading Services page images..."
curl -o "public/images/services/web-development.jpg" "https://images.unsplash.com/photo-1498050108223-57bdbe5868ca?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download web development image
curl -o "public/images/services/software-erp.jpg" "https://images.unsplash.com/photo-1460925895917-afdab827c72f?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download ERP image
curl -o "public/images/services/mobile-apps.jpg" "https://images.unsplash.com/photo-1512941330086-2b6a2d992118?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download mobile apps image
curl -o "public/images/services/cloud-hosting.jpg" "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download cloud hosting image
curl -o "public/images/services/digital-marketing.jpg" "https://images.unsplash.com/photo-1563080248606-fa3c69bc8267?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download digital marketing image
curl -o "public/images/services/dit-consulting.jpg" "https://images.unsplash.com/photo-1556761175-4b46a5223cb3?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download IT consulting image

echo "Downloading Products page images..."
curl -o "public/images/products/crm-dashboard.jpg" "https://images.unsplash.com/photo-1556742049-0cfed4f7a0ee?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download CRM image
curl -o "public/images/products/erp-dashboard.jpg" "https://images.unsplash.com/photo-1460925895917-afdab827c72f?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download ERP image
curl -o "public/images/products/erp-system.jpg" "https://images.unsplash.com/photo-1576091160399-112ba4ed587c?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download ERP system image
curl -o "public/images/products/hms-dashboard.jpg" "https://images.unsplash.com/photo-1556740738-b616e587f9c2?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download HMS image
curl -o "public/images/products/pos-billing.jpg" "https://images.unsplash.com/photo-1556740738-b616e587f9c2?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download POS image
curl -o "public/images/products/hrms-portal.jpg" "https://images.unsplash.com/photo-1504384304562-7839a84c2d4e?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download HRMS image
curl -o "public/images/products/school-erp.jpg" "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download School ERP image

echo "Downloading Portfolio images..."
curl -o "public/images/portfolio/dr-apple-website.jpg" "https://images.unsplash.com/photo-1576091160559-1e8f423aa4ed?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download project 1 image
curl -o "public/images/portfolio/manavta-hms.jpg" "https://images.unsplash.com/photo-1519494929784-aef427b63ebf?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download project 2 image
curl -o "public/images/portfolio/girnar-restaurant.jpg" "https://images.unsplash.com/photo-1504674900247-0877df9cc8ce?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download project 3 image
curl -o "public/images/portfolio/kids-fashion-store.jpg" "https://images.unsplash.com/photo-1558700363-806ef5af1aac?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download project 4 image
curl -o "public/images/portfolio/ayansh-security.jpg" "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download project 5 image
curl -o "public/images/portfolio/saurabh-dixit-portfolio.jpg" "https://images.unsplash.com/photo-1493800807682-fb16c3aaae3a?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download project 6 image

echo "Downloading Blog images..."
curl -o "public/images/blog/erp-spreadsheet.jpg" "https://images.unsplash.com/photo-1543283699-e67d4f7f822e?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download blog post 1 image
curl -o "public/images/blog/website-speed.jpg" "https://images.unsplash.com/photo-1509024353047-b2f84b0df9dc?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download blog post 2 image
curl -o "public/images/blog/local-seo-map.jpg" "https://images.unsplash.com/photo-1524661135-423995f42d9b?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download blog post 3 image
curl -o "public/images/blog/app-vs-website.jpg" "https://images.unsplash.com/photo-1576014169224-e61a2e7854cb?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download blog post 4 image

echo "Downloading Process images..."
curl -o "public/images/process/listen.jpg" "https://images.unsplash.com/photo-1517423568367-79e62fbe4b09?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download process listen image
curl -o "public/images/process/strategy.jpg" "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download process strategy image
curl -o "public/images/process/build.jpg" "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download process build image
curl -o "public/images/process/launch.jpg" "https://images.unsplash.com/photo-1473968952525-a83bdc45e3d4?w=800&h=500&fit=crop&q=80" 2>nul || echo [WARN] Failed to download process launch image

echo "Downloading Extras..."
curl -o "public/images/careers/team-success.jpg" "https://source.unsplash.com/featured/?office,corporate,workspace" 2>nul || echo [WARN] Failed to download extra 1 image
curl -o "public/images/contact/company-office.jpg" "https://source.unsplash.com/featured/?building,office,corporate" 2>nul || echo [WARN] Failed to download extra 2 image

echo ""
echo =========================================
echo All images downloaded!
echo =========================================
echo ""
echo Total images created: %1 public/images* %D
del temp-dir.txt >nul 2>&1

pause
