FROM centos:centos8

WORKDIR /usr/local/src
RUN dnf upgrade -y &&\
	dnf install java-1.8.0-openjdk which -y

ARG PULSAR_VERSION=2.5.1

RUN curl https://archive.apache.org/dist/pulsar/pulsar-${PULSAR_VERSION}/apache-pulsar-${PULSAR_VERSION}-bin.tar.gz -O &&\
	tar -xvzf apache-pulsar-${PULSAR_VERSION}-bin.tar.gz &&\
	rm apache-pulsar-${PULSAR_VERSION}-bin.tar.gz >/dev/null

WORKDIR /usr/local/src/apache-pulsar-${PULSAR_VERSION}
CMD [ "bin/pulsar", "standalone" ]
