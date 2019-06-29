# Deploy script for CarbonFootprint-API
#!/bin/bash
cd "$(dirname "$0")"
echo Inside CarbonFootprint Directory

# Update API and Website
sudo git checkout master
sudo git pull origin master -f
echo New master fetched

# Update docs
cd docs
sudo gitbook build
cd ..
echo Docs Updated

# install client packages
cd client
sudo npm install -y
echo client packages installed

# creating react build
sudo npm run build 
cd ..
echo react build finished

# install backend packages
sudo npm install -y
sudo pm2 restart bin/www
echo sudo pm2 list

echo All actions performed, exiting now.
exit
