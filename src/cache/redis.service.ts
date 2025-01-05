import { Injectable } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisService {
	private redis: Redis;

	constructor() {
		this.redis = new Redis({
			host: process.env.REDIS_HOST,
			port: parseInt(process.env.REDIS_PORT, 10),
			username: process.env.REDIS_USERNAME, 
			password: process.env.REDIS_PASSWORD
		});
	}

	async addToSet(key: string, value: number[]): Promise<void> {
		this.redis.sadd(key, value);
	}

	async getSet(key: string): Promise<string[]> {
		return this.redis.smembers(key);
	}

}
