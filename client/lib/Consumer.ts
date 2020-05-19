import Pulsar from './Pulsar';
import { Consumer as PulsarConsumer, SubscribeOpts } from 'pulsar-client';
import * as os from 'os';

export default class Consumer {
	private subscribe?: PulsarConsumer;
	private client: Pulsar;
	private config: SubscribeOpts & typeof consumerDefaultConfig;

	constructor(config: ConsumerConfig, client: Pulsar) {
		this.config = { ...consumerDefaultConfig, ...config };
		this.client = client;
	}

	async connect() {
		this.subscribe = await this.client.subscribe({ topic: this.config.topic, subscription: this.config.subscription });
	}

	async close() {
		await this.subscribe?.close();
	}

	async getMessage() {
		if(this.subscribe == undefined) {
			await this.connect();
		}
		const msg = await this.subscribe!.receive();
		this.subscribe!.acknowledge(msg);
		return msg.getData().toString();
	}
}

export const consumerDefaultConfig = {
	topic: 'my-topic',
	subscription: os.hostname()
};
export type ConsumerConfig = Omit<SubscribeOpts, keyof (typeof consumerDefaultConfig)> & Partial<typeof consumerDefaultConfig>;
