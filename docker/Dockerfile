FROM nginx

COPY ./dist/index.html /app/
COPY ./dist/ie.html /app/
COPY ./dist/favicon.ico /app/
COPY ./dist/manifest.json /app/
COPY ./dist/manifest.webmanifest.json /app/
COPY ./dist/registerSW.js /app/
COPY ./dist/robots.txt /app/
COPY ./dist/sw.js /app/
COPY ./dist/sw.js.map /app/
COPY ./dist/workbox-*.js /app/
COPY ./dist/workbox-*.js.map /app/
COPY ./dist/assets/js /app/assets/js
COPY ./dist/assets/css /app/assets/css
COPY ./dist/assets/fonts /app/assets/fonts
COPY ./dist/assets/images /app/assets/images
COPY ./nginx/nginx.conf /etc/nginx/conf/nginx.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
# 守护进程需要关掉 nginx, 不然再次启动docker时会报错
CMD ["nginx", "-g", "daemon off;"]
