docker run \
    -p 3306:3306 \
    -v ./deployed/:/docker-entrypoint-initdb.d \
    --name emp-mysql \
    -e MYSQL_ROOT_PASSWORD=gogoedt \
    -e MYSQL_DATABASE=edt \
    -d mysql:latest
