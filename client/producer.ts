import Producer from './lib/Producer';
import Client from './lib/Pulsar';
import fetch from 'node-fetch';

(async () => {
	const client = new Client({});
	const producer = new Producer({ sendTimeoutMs: 0 }, client);

	let flag = false;
	while(!flag) {
		flag = await checkCluster();
		await sleep(2);
	}

	producer.sendMessage('hallo world');
	await producer.close();
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
