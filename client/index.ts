import Consumer from './lib/Consumer';
import Producer from './lib/Producer';
import Client from './lib/Pulsar';

const client = new Client({});

(async () => {
	const consumer = new Consumer({}, client);
	console.log(await consumer.getMessage());
	await consumer.close();
})();

(async () => {
	const producer = new Producer({}, client);
	producer.sendMessage('hallo world');
	await producer.close();
})();
