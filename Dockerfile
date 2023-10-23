FROM node:18.16.0
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN yarn install --ignore-engines
RUN yarn add bootstrap@5.2.3
COPY . ./

COPY ./env.sh .
COPY .env .
# Make our shell script executable
RUN chmod +x env.sh

EXPOSE 3000:3000
ENTRYPOINT ["yarn","start","/app/env.sh"]