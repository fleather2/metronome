FROM node:18
USER root

RUN mkdir /app
ADD ./ /app/

WORKDIR /app

RUN npm config set strict-ssl false
RUN npm init --yes
RUN npm install react-router-dom
RUN npm install @mui/material @emotion/react @emotion/styled
RUN npm install formik
RUN npm install boostrap react-bootstrap
RUN npm install motion
RUN npm install react-scripts
RUN npm install @mui/material @mui/styled-engine-sc styled-components
RUN npm install

EXPOSE 3000
