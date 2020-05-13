import { Client } from 'pulsar-client';

export default class Pulsar<C extends PulsarConfig = PulsarConfig> {
	readonly config: Required<C>;
	client: Client;

	constructor(config: C, defaultConfig: Required<C>) {
		this.config = { ...defaultConfig, ...config };
		this.client = new Client({
			serviceUrl: `pulsar${this.config.ssl ? '+ssl' : ''}://${this.config.host}:${this.config.port}`,
		});
	}

	async close() {
		await this.client.close();
	}
}

export type PulsarConfig = {
	ssl?: boolean,
	host?: string,
	port?: number,
};

export const pulsarDefaultConfig: Required<PulsarConfig> = {
	ssl: false,
	host: 'localhost',
	port: 6650,
};
