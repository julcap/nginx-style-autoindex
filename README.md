## Style autoindex on Nginx

Serve static assets from Nginx and add custom styles using plain CSS.

This solution is using Docker and contains 2 sites to combine static file hosting
with a site.

#### Before
![Before](./before.png)

#### After
![After](./after.png)


### Requirements

```
docker
docker-compose
```

### Instructions

Add static site files to `public` folder and files to `files` folder.
To customize styling modify `files/.autoindex.css`

```
docker-compose up -d
```