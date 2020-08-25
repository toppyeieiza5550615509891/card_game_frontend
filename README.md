# Card game frontend
    - React version >= 16.13.1

# Config
```
    ไป set ค่า server backend ที่ไฟล์config.js
```

# Deploy
```
    $ docker build -t docker-react ./
    $ docker run -it -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 3000:3000 --rm -d docker-react
```