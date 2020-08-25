# Card game frontend
    เกม จับคู่ไพ่ โดยใช้ 
    stack 
        backend: fastapi (base on python)
        frontend: react

# Important
    - React version >= 16.13.1
    - node >=12.8

# Config
```
    - ไป set ค่า server backend ที่ไฟล์config.js
    example {backend: 'http://127.0.0.1:8000'}
```

# Deploy
```
    $ docker build -t docker-react .
    $ docker run -it -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 3000:3000 --rm -d docker-react
```