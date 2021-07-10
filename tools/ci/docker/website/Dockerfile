FROM node:14.16.1
LABEL maintainer milan@darkrush.photo
WORKDIR /usr/src/app
COPY dist/node_modules/ ./node_modules/
COPY dist/website/. /usr/src/app/dist/website
EXPOSE 8080
CMD ["node", "/usr/src/app/dist/website/server/main"]