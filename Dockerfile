FROM nginx

COPY dist/timesheets-interviewer-frontend/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
