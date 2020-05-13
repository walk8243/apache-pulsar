import Consumer from './lib/Consumer';

(async () => {
	const consumer = new Consumer({ host: 'pulsar-server', port: 80 });
	console.log(await consumer.getMessage());
	await consumer.close();
})();
