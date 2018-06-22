
<!-- MarkdownTOC -->

  - [initial](#initial)
  - [steps to take LEMP](#steps-to-take-lemp)
    - [install nginx](#install-nginx)
    - [php](#php)mm
    - [ssl renewal](#ssl-renewal)
    - [11/13/2017 for services.sitebuilt.net](#11132017-for-servicessitebuiltnet)
    - [ssl letsencrypt](#ssl-letsencrypt)
      - [current certificates](#current-certificates)
    - [phpmyadmin](#phpmyadmin)
    - [mysql backup and send to another server](#mysql-backup-and-send-to-another-server)
    - [scp](#scp)
    - [wuff](#wuff)
  - [iotup.stream](#iotupstream)
  - [rsync](#rsync)
  - [nvm](#nvm)
      - [how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-0](#how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-0)
      - [wss](#wss)
  - [backups](#backups)
- [services](#services)
  - [geniot](#geniot)
    - [wss](#wss-1)
  - [postgres](#postgres)
    - [problem with /home/boggedbus/public_html/boggedbus/server/app.js](#mproblem-with-homeboggedbuspublichtmlboggedbusserverappjs)
    - [/home/services/token-auth-service](#homeservicestoken-auth-service)
  - [app icons](#app-icons)
  - [forever](#forever)
  - [regex sed grep for backup.sh](#regex-sed-grep-for-backupsh)
    - [rsync scripts from sitebuilt to parleyvale](#rsync-scripts-from-sitebuilt-to-parleyvale)
  - [databases](#databases)
    - [mysql](#mysql)
    - [mongo](#mongo)
      - [cheatsheet](#cheatsheet)
    - [psql](#psql)

<!-- /MarkdownTOC -->

##initial
https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04
create user tim
Add Public Key Authentication (Recommended)
Set Up a Basic Firewall not done

    sudo ufw app list
## steps to take LEMP
https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-in-ubuntu-16-04

### install nginx
first

    sudo service apache2 stop
    sudo update-rc.d -f  apache2 remove
    sudo nano /etc/php/7.0/fpm/php.ini

    cgi.fix_pathinfo=0
Now, we just need to restart our PHP processor by typing:

    sudo systemctl restart php7.0-fpm    

change /etc/nginx/sites-available/default to

    server {
        listen 80 default_server;
        listen [::]:80 default_server;
        root /var/www/html;
        server_name sitebuilt.net;
        index index.php index.html index.htm;

        location / {
            try_files $uri $uri/ /index.html;
        }
        location ~ \.php$ {
            include snippets/fastcgi-php.conf;
            fastcgi_pass unix:/run/php/php7.0-fpm.sock;
        }
      location ~ /\.ht {
          deny all;
      }     
    }

Test your configuration file for syntax errors by typing:

    sudo nginx -t

When you are ready, reload Nginx to make the necessary changes:

    sudo systemctl reload nginx    

###php
Now, we just need to restart our PHP processor by typing:

    sudo systemctl restart php7.0-fpm
in /var/www/html/info.php

    <?php
    phpinfo();
When you are finished, save and close the file.

Now, you can visit this page in your web browser by visiting your server's domain name or public IP address followed by /info.php:

http://sitebuilt.net/info.php    

<div id="ssl"></div>

### ssl renewal

#### 1/26/2018 for services.sitebuilt.net
    root@SBSiniz:~# service nginx stop
    root@SBSiniz:~# sudo letsencrypt certonly --standalone -d services.sitebuilt.net
    Saving debug log to /var/log/letsencrypt/letsencrypt.log
    Plugins selected: Authenticator standalone, Installer None
    Starting new HTTPS connection (1): acme-v01.api.letsencrypt.org
    Cert is due for renewal, auto-renewing...
    Renewing an existing certificate
    Performing the following challenges:
    tls-sni-01 challenge for services.sitebuilt.net
    Waiting for verification...
    Cleaning up challenges

    IMPORTANT NOTES:
     - Congratulations! Your certificate and chain have been saved at:
       /etc/letsencrypt/live/services.sitebuilt.net-0002/fullchain.pem
       Your key file has been saved at:
       /etc/letsencrypt/live/services.sitebuilt.net-0002/privkey.pem
       Your cert will expire on 2018-04-26. To obtain a new or tweaked
       version of this certificate in the future, simply run certbot
       again. To non-interactively renew *all* of your certificates, run
       "certbot renew"
     - If you like Certbot, please consider supporting our work by:

       Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
       Donating to EFF:                    https://eff.org/donate-le

    root@SBSiniz:~# service nginx start
    root@SBSiniz:~#

caveat- had to change in sites-available to the -0002 certificates

    server {
      listen 80;
        listen [::]:80;
        listen 443;
      server_name services.sitebuilt.net;
    ssl on;
    ssl_certificate /etc/letsencrypt/live/services.sitebuilt.net-0002/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/services.sitebuilt.net-0002/privkey.pem;

### ssl letsencrypt
sudo `certbot-auto renew` works on sitebuilt and renews...
  /etc/letsencrypt/live/sitebuilt.net-0001/fullchain.pem (skipped)
  /etc/letsencrypt/live/sitebuilt.net/fullchain.pem (skipped)
  /etc/letsencrypt/live/services.sitebuilt.net/fullchain.pem (skipped)
  /etc/letsencrypt/live/iot.sitebuilt.net/fullchain.pem (skipped)
  /etc/letsencrypt/live/sitebuilt.net-0002/fullchain.pem (skipped)

for iotup.stream... do this
`letsencrypt certonly -a webroot -w /var/www/html -d iotup.stream -d www.iotup.stream -w /home/wiki/public_html/wiki -d wiki.iotup.stream`

So most of the time you can just add subdomains to the main domains certificate. Sometimes for reverse-proxy of node apps running on ports you have to create standalone

#### current certificates
https://community.letsencrypt.org/t/nginx-auto-renewal/30894
Yeah, there are a couple of more automatic ways now. The one most nginx users seem to prefer is the webroot plugin: first obtain a new cert using something like:

certbot certonly --webroot -w /path/to/your/webroot -d example.com --post-hook="service nginx reload"
(or whatever the systemd equivalent is), then set up a cron job to run certbot renew once or twice a day; it will only run the post-hook when it actually renews the certificate. You can also use --pre-hook if you prefer to stop nginx to run certbot in standalone mode.

There's also a full nginx plugin, which you can activate with --nginx. It's still being tested, so experiment at your own risk and report any bugs.

to find out the time left on a protected url

    echo | openssl s_client -connect iot.sitebuilt.net:443 2>/dev/null | openssl x509 -noout -dates

responds with

    notBefore=Jul 24 00:32:00 2017 GMT
    notAfter=Oct 22 00:32:00 2017 GMT   

method a
1. systemctl stop nginx
2. certbot renew
3. systemctl start nginx or reboot

method a2
certbot renew --pre-hook "systemctl stop nginx" --post-hook "systemctl start nginx"

method b
1. sudo cerbot-auto renew
2. service nginx stop
3. sudo letsencrypt certonly --standalone -d services.sitebuilt.net




 (ref: /etc/letsencrypt/renewal/sitebuilt.net-0001.conf)
sudo letsencrypt certonly -a webroot -w /var/www/html/ -d sitebuilt.net -d www.sitebuilt.net -w /home/wiki/public_html/wiki/ -d wiki.sitebuilt.net -w /home/wuff/public_html/wuff/ -d wuff.sitebuilt.net -w /home/cascada/public_html/ -d cascada.sitebuilt.net -w /home/tryit/public_html/ -d tryit.sitebuilt.net -w /home/iot/public_html/geniot/raw/ -d iot.sitebuilt.net

<s>sudo letsencrypt certonly -a --standalone -d services.sitebuilt.net</s>
cretbot-auto renew might renew services.sitebuilt.net

https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04

    sudo apt-get update
    sudo apt-get install letsencrypt

    sudo nano /etc/nginx/sites-available/default
Inside the server block, add this location block:
Add to SSL server block

        location ~ /.well-known {
                allow all;
        }

sudo letsencrypt certonly -a webroot --webroot-path=/var/www/html -d sitebuilt.net -d www.sitebuilt.net -d wiki.sitebuilt.net

IMPORTANT NOTES:
 - If you lose your account credentials, you can recover through
   e-mails sent to mckenna.tim@gmail.com.
 - Congratulations! Your certificate and chain have been saved at
   /etc/letsencrypt/live/sitebuilt.net/fullchain.pem. Your cert will
   expire on 2017-03-28. To obtain a new version of the certificate in
   the future, simply run Let's Encrypt again.
 - Your account credentials have been saved in your Let's Encrypt
   configuration directory at /etc/letsencrypt. You should make a
   secure backup of this folder now. This configuration directory will
   also contain certificates and private keys obtained by Let's
   Encrypt so making regular backups of this folder is ideal.
 - If you like Let's Encrypt, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le


in /etc/letsencrypt/archive/sitebuilt.net/

    cert.pem: Your domain's certificate
    chain.pem: The Let's Encrypt chain certificate
    fullchain.pem: cert.pem and chain.pem combined
    privkey.pem: Your certificate's private key

### phpmyadmin

    sudo ln -s /usr/share/phpmyadmin /var/www/html

### mysql backup and send to another server

    mysqldump -u root -p --opt [database name] > [database name].sql
    scp newdatabase.sql user@example.com:/root

    mysqlcheck -uroot -p --repair --all-databases

### scp
    scp -r /home/stuff2getapi/s2g-api/ root@sitebuilt.net:/ home/services/





https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04

stphnwish comment

sudo letsencrypt certonly -a webroot -w /var/www/html/ -d sitebuilt.net -d www.sitebuilt.net -w /home/wiki/public_html/wiki/ -d wiki.sitebuilt.net -w /home/wuff/public_html/wuff/ -d wuff.sitebuilt.net

### wuff
in sites-available

    location / {
      try_files $uri $uri/ =404;
      auth_basic "Restricted Content";
      auth_basic_user_file /etc/nginx/.htpasswd;      
    }


You can add a username to the file using this command. We are using sammy as our username, but you can use whatever name you'd like:

    sudo sh -c "echo -n 'tim:' >> /etc/nginx/.htpasswd"
Next, add an encrypted password entry for the username by typing:

    sudo sh -c "openssl passwd -apr1 >> /etc/nginx/.htpasswd"


systemctl command (e.g. sudo systemctl mongodb stop, sudo systemctl mongodb start).    

##iotup.stream

sudo letsencrypt certonly -a webroot --webroot-path=/var/www/html -d iotup.stream -d www.iotup.stream

sudo letsencrypt certonly -a webroot -w /var/www/html -d iotup.stream -d www.iotup.stream -w /home/wiki/public_html/wiki -d wiki.iotup.stream

sudo letsencrypt certonly -a webroot -w /var/www/html/ -d sitebuilt.net -d www.sitebuilt.net -w /home/wiki/public_html/wiki/ -d wiki.sitebuilt.net -w /home/wuff/public_html/wuff/ -d wuff.sitebuilt.net

sudo letsencrypt certonly -a webroot -w /var/www/html/ -d sitebuilt.net -d www.sitebuilt.net -w /home/wiki/public_html/wiki/ -d wiki.sitebuilt.net -w /home/wuff/public_html/wuff/ -d wuff.sitebuilt.net

IMPORTANT NOTES:
 - If you lose your account credentials, you can recover through
   e-mails sent to mckenna.tim@gmail.com.
 - Congratulations! Your certificate and chain have been saved at
   /etc/letsencrypt/live/iotup.stream/fullchain.pem. Your cert will
   expire on 2017-03-31. To obtain a new version of the certificate in
   the future, simply run Let's Encrypt again.
 - Your account credentials have been saved in your Let's Encrypt
   configuration directory at /etc/letsencrypt. You should make a
   secure backup of this folder now. This configuration directory will
   also contain certificates and private keys obtained by Let's
   Encrypt so making regular backups of this folder is ideal.
 - If you like Let's Encrypt, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le

   sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048

   Let’s Encrypt certificates are valid for 90 days, but it’s recommended that you renew the certificates every 60 days to allow a margin of error. At the time of this writing, automatic renewal is still not available as a feature of the client itself, but you can manually renew your certificates by running the Let’s Encrypt client with the renew option.

To trigger the renewal process for all installed domains, run this command:

    sudo letsencrypt renew

Let's edit the crontab to create a new job that will run the renewal command every week. To edit the crontab for the root user, run:

    sudo crontab -e
Add the following lines:

    crontab entry
    30 2 * * 1 /usr/bin/letsencrypt renew >> /var/log/le-renew.log
    35 2 * * 1 /bin/systemctl reload nginx

##rsync
   http://johnveldboom.com/posts/sync-files-between-servers-using-rsync/
   http://olivier.sessink.nl/publications/hotcloning/
   https://djlab.com/2013/02/cloning-a-live-linux-system-with-rsync-over-ssh/
   http://www.howtogeek.com/135533/how-to-use-rsync-to-backup-your-data-on-linux/

   rsync -aAXv --exclude-from=/root/rsync_exclude.txt   
   rsync -avuz --exclude-from=/root/rsync_exclude.txt / root@iotup.stream:/

   ### rsync cron
   http://wiki.sitebuilt.net/index.php?title=Cron

   in /var/spool/cron/crontabs/root

    # m h  dom mon dow   command
    0 2 * * * cd /usr/local/lib/tm/scripts; ./backup.sh
    0 3 * * * find /var/backups/s3/*.gz -ctime +21 -type f -print | xargs rm -f
    30 3 * * * rsync -avuz --exclude-from=/root/rsync_exclude.txt / root@iotup.stream:/


even after you change it by yourself you can install it by running as root

    sudo crontab -u root /var/spool/cron/crontabs/root

The following will run script on the 1st of Jan, Apr, Jul and Oct at 03:30

    30 03 01 Jan,Apr,Jul,Oct * /path/to/script
    30 04 25 Feb,Apr,Jun,Aug,Oct,Dec * /usr/bin/letsencrypt renew >> /var/log/le-renew.log
    35 04 25 Feb,Apr,Jun,Aug,Oct,Dec * /bin/systemctl reload nginx
Alternatively, but less obvious

    30 03 01 */3 * /path/to/script
Will run every three months at 03:30 on the 1st of Jan,Apr,Jul and Oct.
## nvm
     nvm ls-remote
     nvm install 7.3.0
     nvm use 7.3.0
     nvm alias default 7.3.0
     nvm use default
     npm install -g express (shared by app suing this version)

Installing globally will let you run the commands from the command line, but you'll have to link the package into your local sphere to require it from within a program:

    npm link express

#### [how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-0](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-0)    
https://www.digitalocean.com/community/tutorials/how-to-configure-nginx-as-a-web-server-and-reverse-proxy-for-apache-on-one-ubuntu-16-04-server

You can use the Qualys SSL Labs Report to see how your server configuration scores:In a web browser:
https://www.ssllabs.com/ssltest/analyze.html?d=example.com

#### wss
    location /geniot/ws {
        proxy_pass http://localhost:3333/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 86400;
    }


##backups



/usr/local/lib/tim/scripts/backup.sh

    #!/bin/bash
    _now=$(date +"%Y-%m-%d")
    _dir="/var/backups/s3/"
    _file="files_$_now.tar.gz"
    _bth=$_dir$_file
    echo "Starting backup to $_bth..."
    mongodump --out /var/backups/s3/mongo
    _mon="mongodb_"$_now".gz"
    _monb=$_dir$_mon
    _pgfn="pg_dbs_"$_now".gz"
    psql template1 -At -c 'select datname from pg_database' > pglist.txt
    _pglist=`cat pglist.txt`
    for _db in $_pglist
    do
      echo $_db
      pg_dump $_db > /var/backups/s3/pg/$_db.sql
    done
    tar czf $_dir$_pgfn /var/backups/s3/pg
    tar czf $_monb /var/backups/s3/mongo
    tar zcf $_bth --files-from=file-dir-list.txt --exclude-from=file-dir-excludes.txt --no-recursion
    php s3_dir.php $_file mcktimoSBS
    php s3_dir.php $_mon mcktimoSBS
    php s3_dir.php $_pgfn mcktimoSBS
    php s3_db.php sitebuil_wuffdb mcktimoSBS
    php s3_db.php sitebuil_wikidb mcktimoSBS
    php s3_db.php sitebuil_wrdp1 mcktimoSBS
    php s3_db.php hsc mcktimoSBS
    php s3_db.php restoring mcktimoSBS



    tar czf --exclude-from=file-dir-excludes.txt test.tar.gz $(<file-dir-list.txt)    
    tar czf --exclude-from=file-dir-excludes.txt --include-from=file-dir-list.txt test.tar.gz

    tar zcf test.tar.gz --files-from=file-dir-list.txt --exclude-from=file-dir-excludes.txt --no-recursion

    tar zcf $_bth --files-from=file-dir-list.txt --exclude-from=file-dir-excludes.txt --no-recursion


/usr/local/lib/tm/scripts/*.sh
/usr/local/lib/tm/scripts/*.php
/usr/local/lib/tm/scripts/*.txt
/usr/local/lib/tm/scripts/*.json    

# services
## geniot
### wss
in order to connect to wss your application needs the final slash on the end of `wss://services.sitebuilt.net/ws/`

## postgres
https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04

    sudo -u postgres createuser --inter active

Switch over to the postgres account on your server by typing:

    sudo -i -u postgres

### problem with /home/boggedbus/public_html/boggedbus/server/app.js

    var conString = "postgres://postgres:jjjjjj@localhost/mbta";
    var client = new pg.Client(conString);

didn't work until
in /etc/postgresql/9.5/main/pg_hba.conf
Add a new line to the top of pg_hba.conf:

    local    postgres     postgres     peer   

    sudo -u postgres psql
    psq# ALTER USER postgres PASSWORD 'jjjjjj';

adduser bogged
su - postgres
psql mbta
CREATE USER bogged WITH PASSWORD 'jjjjjj';
GRANT ALL PRIVILEGES ON DATABASE mbta to bogged;
\q
su - bogged
psql mbta
psql mbta

ALTER USER root WITH PASSWORD 'nji9ol';
ALTER USER root WITH SUPERUSER;

To dump all databases:

$ pg_dumpall > db.out

To reload this database use, for example:
$ psql -f db.out postgres

    psql -U postgres -At -c 'select datname from pg_database'
template1
template0
postgres
mbta

### /home/services/token-auth-service
startup shows an error unless...
In the file `node_modules/mongoose/node_modules/mongodb/node_modules/bson/ext/index.js`, change the line

    bson = require('../build/Release/bson');
to

    bson = require('bson');

##app icons

    apt-get install imagemagick
    convert bus_stop.png -resize 192x19 2 busstop192.png
to index.html

<link rel="icon" sizes="192x192" href="busstop192.png">

## forever
https://github.com/foreverjs/forever

using a json file is flaky, instead in /root/forgone.sh

    #!/bin/sh
    forever stopall
    sleep 2
    fuser -KILL -k -n tcp 3002
    forever --uid tokauth -a start /home/services/token-auth-server/server.js
    sleep 2
    fuser -KILL -k -n tcp 3009
    forever --uid bogged -a start /home/boggedbus/public_html/boggedbus/server/app.js
    sleep 2
    fuser -KILL -k -n tcp 1883 # mqtt
    fuser -KILL -k -n tcp 3332 # express
    fuser -KILL -k -n tcp 3333 # wss
    forever --uid geniot -a start /home/services/geniot/lib/index.js
    sleep 2
    fuser -KILL -k -n tcp 1642
    forever --uid hellossl -a start /home/services/hello/hello.js
    sleep 2
    forever list


and put it in @reboot of /var/spool/cron/crontab/root

    @reboot /root/forgone.sh
    # m h  dom mon dow   command
    0 2 * * * cd /usr/local/lib/tm/scripts; ./backup.sh
    0 3 * * * find /var/backups/s3/*.gz -ctime +5 -type f -print | xargs rm -f
    30 3 * * * rsync -avuz --exclude-from=/root/rsync_exclude.txt / root@iotup.stream:/
    30 04 25 Feb,Apr,Jun,Aug,Oct,Dec * /usr/bin/letsencrypt renew >> /var/log/le-renew.log
    35 04 25 Feb,Apr,Jun,Aug,Oct,Dec * /bin/systemctl reload nginx


## regex sed grep for backup.sh
http://www.tldp.org/LDP/abs/html/string-manipulation.html

from /usr/loca/lib/tm/scripts/test_mo.sh

grep tosses out everything before your regex
sed applies a regex to an input(file or var)
grep ans sed and I guess other cmds normally works from a file

    grep '\[' mo.text
but if you wand to feed it a bash variable instead...

    grep '\[' <<< $bashvar
and if you want to capture the results in a new var...

    nevar=$(grep '\[' <<< $bashvar)
or you can just feed them into each other moving from inner to outer

    grep '\[' <<< "$(sed 's/"//g' <<< "$_dbs")"

    #!/bin/bash
    _dbs=`mongo test --eval "db.getMongo().getDBNames()"`
    echo $_dbs # gives you...
    # MongoDB shell version: 3.2.11 connecting to: test [ "bus", "demiot", "hvac", "local", "mqtt", "stuffDb", "test" ]
    grep '\[' <<< "$_dbs" #include everything after [
    ar=$(sed 's/"//g' <<< "$_dbs") # take out quotes
    ar2=$(grep '\[' <<< "$ar")
    ar3=$(sed 's/\[//g' <<< "$ar2")
    ar4=$(sed 's/\ ]//g' <<< "$ar3")
    ar5=$(sed 's/\,//g' <<< "$ar4")
    for dn in $ar5
    do
      echo $dn
    done
    echo $ar5
    #inner->outer, keep_everything_sfter\[->remove"->remove[->remove]->remove,
    grep '\[' <<< "$(sed 's/"//g' <<< "$_dbs")"
    li=$(sed 's/\,//g' <<< "$(sed 's/\ ]//g' <<< "$(sed 's/\[//g' <<< "$(sed 's/"//g' <<< "$(grep '\[' <<< "$_dbs")")")")")
    echo $li
    for dnn in $li
    do
      echo $dnn
    done


### rsync scripts from sitebuilt to parleyvale

     rsync -avuz /usr/local/lib/tm/scripts/*.* root@parleyvale.com:/usr/local/lib/tm/scripts/

## databases
### mysql
   /var/lib/mysql
### mongo
  /var/lib/mongodb
#### cheatsheet
    mongo stuffDb
    db.lists.find().pretty()


### psql
