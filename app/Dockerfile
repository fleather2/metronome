FROM node:18
USER root

RUN mkdir /app
ADD ./ /app/

WORKDIR /app

RUN npm config set strict-ssl false
RUN npm install
RUN npm install react-router-dom
RUN npm install @mui/material @emotion/react @emotion/styled
RUN npm install formik
RUN npm install boostrap react-bootstrap
EXPOSE 3000
