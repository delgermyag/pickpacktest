FROM node:16
# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /
# Installing dependencies
COPY package*.json ./
COPY /prisma/schema.prisma
RUN npm install
RUN npx prisma generate
RUN npx prisma migrate dev --name init
# Copying source files
COPY . .
# Building app
RUN npm run build
EXPOSE 80
# Running the app
CMD [ "npm", "start" ]
