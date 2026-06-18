# Script to download images for Sawariya Solution website
# Creates a directory structure with relevant images

echo "Creating image directories..."
mkdir -p public/images/{home,about,services,products,portfolio,blog}
mkdir -p public/images/process

echo ""
echo "Downloading images from Unsplash Source (high quality creative commons images)..."
echo ""

# Home page hero - IT team scene
curl "https://source.unsplash.com/random/1200x700/?it,team" --output "public/images/home/team-at-work.jpg" 2>/dev/null || \
curl "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop&q=80" --output "public/images/home/team-at-work.jpg"

# About page team
curl "https://source.unsplash.com/random/750x500/?team,office" --output "public/images/about/team-meeting.jpg" 2>/dev/null || \
curl "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop&q=80" --output "public/images/about/team-meeting.jpg"

# Process images
curl -o "public/images/process/listen.jpg" "https://images.unsplash.com/photo-1517245386806-b94c6a5ad99d?w=800&h=500&fit=crop&q=80"  # discussion
curl -o "public/images/process/strategy.jpg" "https://images.unsplash.com/photo-1507423630371-dcd8b9cbb6a0?w=800&h=500&fit=crop&q=80"  # whiteboard
curl -o "public/images/process/build.jpg" "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop&q=80"  # coding
curl -o "public/images/process/launch.jpg" "https://images.unsplash.com/photo-1473968952525-a83bdc45e3d4?w=800&h=500&fit=crop&q=80"  # rocket

# Services - Web Development
curl -o "public/images/services/web-development.jpg" "https://images.unsplash.com/photo-1498050108223-57bdbe5868ca?w=800&h=500&fit=crop&q=80"  # website
curl -o "public/images/services/software-erp.jpg" "https://images.unsplash.com/photo-1460925895917-afdab827c72f?w=800&h=500&fit=crop&q=80"  # ERP

# Services - Mobile Apps
curl -o "public/images/services/mobile-apps.jpg" "https://images.unsplash.com/photo-1512941330086-2b6a2d992118?w=800&h=500&fit=crop&q=80"  # mobile
curl -o "public/images/services/cloud-hosting.jpg" "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop&q=80"  # cloud
curl -o "public/images/services/digital-marketing.jpg" "https://images.unsplash.com/photo-1563080248606-fa3c69bc8267?w=800&h=500&fit=crop&q=80"  # marketing
curl -o "public/images/services/it-consulting.jpg" "https://images.unsplash.com/photo-1556761175-4b46a5223cb3?w=800&h=500&fit=crop&q=80"  # consulting

# Products - CRM
curl -o "public/images/products/crm-dashboard.jpg" "https://images.unsplash.com/photo-1556742049-0cfed4f7a0ee?w=800&h=500&fit=crop&q=80"  # CRM
curl -o "public/images/products/erp-system.jpg" "https://images.unsplash.com/photo-1531403009284-440f08f54d13?w=800&h=500&fit=crop&q=80"  # ERP
curl -o "public/images/products/hms-dashboard.jpg" "https://images.unsplash.com/photo-1576091160399-112ba4ed587c?w=800&h=500&fit=crop&q=80"  # hospital
curl -o "public/images/products/pos-billing.jpg" "https://images.unsplash.com/photo-1556740738-b616e587f9c2?w=800&h=500&fit=crop&q=80"  # POS
curl -o "public/images/products/hrms-portal.jpg" "https://images.unsplash.com/photo-1504384304562-7839a84c2d4e?w=800&h=500&fit=crop&q=80"  # HR
curl -o "public/images/products/school-erp.jpg" "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=500&fit=crop&q=80"  # school

# Portfolio - Projects
curl -o "public/images/portfolio/dr-apple-website.jpg" "https://images.unsplash.com/photo-1576091160559-1e8f423aa4ed?w=800&h=500&fit=crop&q=80"  # healthcare
curl -o "public/images/portfolio/manavta-hms.jpg" "https://images.unsplash.com/photo-1519494929784-aef427b63ebf?w=800&h=500&fit=crop&q=80"  # hospital
curl -o "public/images/portfolio/girnar-restaurant.jpg" "https://images.unsplash.com/photo-1504674900247-0877df9cc8ce?w=800&h=500&fit=crop&q=80"  # restaurant
curl -o "public/images/portfolio/kids-fashion-store.jpg" "https://images.unsplash.com/photo-1558700363-806ef5af1aac?w=800&h=500&fit=crop&q=80"  # fashion
curl -o "public/images/portfolio/ayansh-security.jpg" "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop&q=80"  # security
curl -o "public/images/portfolio/saurabh-dixit-portfolio.jpg" "https://images.unsplash.com/photo-1493800807682-fb16c3aaae3a?w=800&h=500&fit=crop&q=80"  # portfolio

# Blog
curl -o "public/images/blog/erp-spreadsheet.jpg" "https://images.unsplash.com/photo-1543283699-e67d4f7f822e?w=800&h=500&fit=crop&q=80"  # spreadsheet
curl -o "public/images/blog/website-speed.jpg" "https://images.unsplash.com/photo-1509024353047-b2f84b0df9dc?w=800&h=500&fit=crop&q=80"  # website
curl -o "public/images/blog/local-seo-map.jpg" "https://images.unsplash.com/photo-1524661135-423995f42d9b?w=800&h=500&fit=crop&q=80"  # map
curl -o "public/images/blog/app-vs-website.jpg" "https://images.unsplash.com/photo-1531403009284-440f08f54d13?w=800&h=500&fit=crop&q=80"  # app vs web

echo ""
echo ""
echo "✅ All images downloaded successfully!"
echo ""
echo "Directory structure created:"
ls -laR public/images/
