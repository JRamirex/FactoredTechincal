FROM node:19
WORKDIR /front
COPY package*.json /front

RUN npm i react@18.2.0
RUN npm i react-scripts@5.0.1
RUN npm i bulma
RUN npm cache verify
RUN npm i chart.js@4.2.1 --force
RUN npm i react-chartjs-2@5.2.0
RUN npm i react-dom

COPY . ./

CMD [ "npm", "start" ]