import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";

@Injectable()
export class RedisService {
	private redis: Redis;

	constructor(private readonly configService: ConfigService) {
		this.redis = new Redis({
			host: this.configService.get<string>('REDIS_HOST'),
			port: parseInt(this.configService.get<string>('REDIS_PORT'), 10),
			username: this.configService.get<string>('REDIS_USERNAME'), 
			password: this.configService.get<string>('REDIS_PASSWORD')
		});
	}

	async addToSet(key: string, value: number[]): Promise<void> {
		this.redis.sadd(key, value);
	}

	async getSet(key: string): Promise<string[]> {
		return this.redis.smembers(key);
	}

	async getSetSize(key: string): Promise<number> {
		return this.redis.scard(key)
	}

	async getSetKeysWithSize(pattern = '*') {
		const keysWithSize: { key: string, size: number }[] = [];
		let cursor = '0';
		do {
			const [newCursor, foundKeys] = await this.redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
			cursor = newCursor;

			for (const key of foundKeys) {
				const type = await this.redis.type(key);
				if (type === 'set') {
          const size = await this.redis.scard(key);
          keysWithSize.push({ key, size });
        }
      }
		} while (cursor !== '0');

		return keysWithSize;
	}
}
