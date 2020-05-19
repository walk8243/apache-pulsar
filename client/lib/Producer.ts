import Pulsar from './Pulsar';
import { Producer as PulsarProducer, ProducerOpts as PulsarProducerOpts } from 'pulsar-client';
import * as os from 'os';

export default class Producer {
	private producer?: PulsarProducer;
	private client: Pulsar;
	private config: PulsarProducerOpts & typeof producerDefaultConfig;

	constructor(config: ProducerConfig, client: Pulsar) {
		this.config = { ...producerDefaultConfig, ...config };
		this.client = client;
	}

	async connect() {
		this.producer = await this.client.createProducer(this.config);
	}

	async close() {
		await this.producer?.close();
	}

	async sendMessage(message: string) {
		if(this.producer == undefined) {
			await this.connect();
		}
		await this.producer!.send({ data: Buffer.from(message) });
	}
}

export const producerDefaultConfig = {
	topic: 'my-topic',
	subscription: os.hostname()
};
export type ProducerConfig = Omit<PulsarProducerOpts, keyof (typeof producerDefaultConfig)> & Partial<typeof producerDefaultConfig>;

