FROM node:erbium

WORKDIR /usr/local/src
RUN curl 'https://www.apache.org/dyn/mirrors/mirrors.cgi?action=download&filename=pulsar/pulsar-2.5.1/DEB/apache-pulsar-client.deb' -OL &&\
	curl 'https://www.apache.org/dyn/mirrors/mirrors.cgi?action=download&filename=pulsar/pulsar-2.5.1/DEB/apache-pulsar-client-dev.deb' -OL &&\
	apt install ./apache-pulsar-client*.deb && rm apache-pulsar-client*.deb

WORKDIR /app
COPY . .
RUN yarn install && yarn run build &&\
	rm -rf node_modules; rm *.ts **/*.ts 2>/dev/null;\
	yarn install --production && yarn cache clean
