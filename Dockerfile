FROM nginx

COPY www/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
