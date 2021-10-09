## Style auto index page on Nginx

#### Before
![Before](./before.png)

#### After
![After](./after.png)

### Instructions

Example Nginx config
```
server {
    listen 80;
    
    root /var/www;  # Root directory

    location /files {
        autoindex on;
        autoindex_exact_size on;
        autoindex_format html;
        alias /var/www/files/;
        add_before_body /header.html;
        add_after_body /footer.html;
    }
}
```

Copy the html, css, js files to the root directory.

```
cp footer.html /var/www/footer.html
cp header.html /var/www/header.html
cp .autoindex.css /var/www/.autoindex.css
cp .autoindex.js /var/www/.autoindex.js
```

Restart Nginx
```
systemctl restart nginx
```

To change the styling just modify .autoindex.css