# Deploy script for CarbonFootprint-API
#!/bin/bash
cd "$(dirname "$0")"
echo Inside CarbonFootprint Directory

# Update docs
cd docs
gitbook build
cd ..
echo Docs Updated

# Update API and Website
sudo git checkout master
sudo git pull origin master -f
echo New master fetched 

sudo yarn install
echo Yarn install performed

sudo yarn run build
echo yarn build performed

sudo pm2 restart bin/www
echo sudo pm2 list

echo All actions performed , exiting now.
exit
