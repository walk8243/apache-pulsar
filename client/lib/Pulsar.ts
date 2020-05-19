import { Client, ClientOpts } from 'pulsar-client';

export default class Pulsar extends Client {
	constructor(config: PulsarConfig) {
		super({ ...pulsarDefaultConfig, ...config });
	}

	async close() {
		await super.close();
		return null;
	}
}

export const pulsarDefaultConfig = {
	serviceUrl: 'pulsar://localhost:6650',
};
export type PulsarConfig = Omit<ClientOpts, keyof (typeof pulsarDefaultConfig)> & Partial<typeof pulsarDefaultConfig>;
