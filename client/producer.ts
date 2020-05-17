import Producer from './lib/Producer';

(async () => {
	const producer = new Producer({ host: 'pulsar-server' });

	let flag = false;
	while(!flag) {
		flag = await checkCluster();
		await sleep(2);
	}

	producer.sendMessage('hallo world');
	await producer.close();
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
