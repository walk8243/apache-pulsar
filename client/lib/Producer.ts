import Pulsar, { PulsarConfig, pulsarDefaultConfig } from './Pulsar';
import { Producer as PulsarProducer } from 'pulsar-client';
import * as os from 'os';

export default class Producer extends Pulsar<ProducerConfig> {
	private producer?: PulsarProducer;

	constructor(config: ProducerConfig) {
		super(config, producerDefaultConfig);
	}

	async connect() {
		this.producer = await this.client.createProducer({ topic: this.config.topic });
	}

	async close() {
		await this.producer?.close();
		await super.close();
	}

	async sendMessage(message: string) {
		if(this.producer == undefined) {
			await this.connect();
		}
		await this.producer!.send({ data: Buffer.from(message) });
	}
}

export type ProducerConfig = {
	topic?: string,
	subscription?: string,
} & PulsarConfig;

export const producerDefaultConfig: Required<ProducerConfig> = {
	...pulsarDefaultConfig,
	topic: 'my-topic',
	subscription: os.hostname()
};
