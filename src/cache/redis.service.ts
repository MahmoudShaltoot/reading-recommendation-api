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

}
