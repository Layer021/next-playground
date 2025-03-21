FROM node:22

WORKDIR /project/next-playground

COPY package.json /project/next-playground
COPY package-lock.json /project/next-playground

RUN npm install

COPY . /project/next-playground

CMD ["npm", "run", "dev"]
