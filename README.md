To start:
```
docker build -t gpu-simulator . && docker run -d -p 3001:3000 gpu-simulator && docker run -d -p 3002:3000 gpu-simulator && docker run -d -p 3003:3000 gpu-simulator && docker run -d -p 3004:3000 gpu-simulator


node load-balancer.js

node server.js

cd frontend && npm run start
```


To stop:

```
docker stop $(docker ps -q) && docker rm $(docker ps -a -q)
```




https://x.com/mo_baioumy/status/1801322369434173860


https://github.com/tlkh/asitop

https://www.youtube.com/watch?v=QBgp5MdApKg