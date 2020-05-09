FROM centos:centos8

WORKDIR /usr/local/src
RUN dnf upgrade -y &&\
	dnf install java-1.8.0-openjdk -y

RUN curl https://archive.apache.org/dist/pulsar/pulsar-2.5.1/apache-pulsar-2.5.1-bin.tar.gz -O &&\
	tar -xvzf apache-pulsar-2.5.1-bin.tar.gz &&\
	rm apache-pulsar-2.5.1-bin.tar.gz

CMD [ "/usr/local/src/bin/pulsar", "standalone" ]
