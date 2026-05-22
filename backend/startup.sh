#!/bin/bash
sed -i 's|root /home/site/wwwroot;|root /home/site/wwwroot/backend/public;|g' /etc/nginx/sites-available/default
sed -i 's|location / {|location / { try_files $uri $uri/ /index.php?$query_string;|g' /etc/nginx/sites-available/default
service nginx reload