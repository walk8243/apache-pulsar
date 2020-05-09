FROM centos:centos8

WORKDIR /usr/local/src
RUN dnf upgrade -y &&\
	dnf install java-1.8.0-openjdk java-1.8.0-openjdk-devel maven unzip zip -y

RUN curl 'https://www.apache.org/dyn/mirrors/mirrors.cgi?action=download&filename=pulsar/pulsar-2.5.1/apache-pulsar-2.5.1-src.tar.gz' -O -L &&\
	tar -xvzf apache-pulsar-2.5.1-src.tar.gz >/dev/null &&\
	cd apache-pulsar-2.5.1 &&\
	mvn install -DskipTests
