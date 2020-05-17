import Consumer from './lib/Consumer';
import Producer from './lib/Producer';

(async () => {
	const consumer = new Consumer({ host: 'pulsar-server', port: 80 });
	console.log(await consumer.getMessage());
	await consumer.close();
})();

(async () => {
	const producer = new Producer({ host: 'pulsar-server', port: 80 });
	producer.sendMessage('hallo world');
	await producer.close();
})();
