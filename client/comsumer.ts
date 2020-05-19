import Consumer from './lib/Consumer';
import Client from './lib/Pulsar';
import fetch from 'node-fetch';

(async () => {
	const client = new Client({});
	const consumer = new Consumer({}, client);

	let flag = false;
	while(!flag) {
		flag = await checkCluster();
		await sleep(2);
	}

	console.log(await consumer.getMessage());
	await consumer.close();
	await client.close();
})();

async function checkCluster() {
	const response = await fetch('http://pulsar-server:8080/admin/v2/clusters');
	if(response.status == 200) {
		return true;
	}
	return false;
}

async function sleep(time: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, time * 1000);
	});
}
