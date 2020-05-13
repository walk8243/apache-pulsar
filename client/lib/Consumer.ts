import Pulsar, { PulsarConfig, pulsarDefaultConfig } from './Pulsar';
import { Consumer as PulsarConsumer } from 'pulsar-client';
import * as os from 'os';

export default class Consumer extends Pulsar<ConsumerConfig> {
	private subscribe?: PulsarConsumer;

	constructor(config: ConsumerConfig) {
		super(config, consumerDefaultConfig);
	}

	async connect() {
		this.subscribe = await this.client.subscribe({ topic: this.config.topic, subscription: this.config.subscription });
	}

	async close() {
		await this.subscribe?.close();
		await super.close();
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

export type ConsumerConfig = {
	topic?: string,
	subscription?: string,
} & PulsarConfig;

export const consumerDefaultConfig: Required<ConsumerConfig> = {
	...pulsarDefaultConfig,
	topic: 'my-topic',
	subscription: os.hostname()
};
