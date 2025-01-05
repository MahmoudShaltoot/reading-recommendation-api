import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { RedisService } from "src/cache/redis.service";
import { UserReadBook } from "src/users-read-book/entities/user-read-book.entity";

@Injectable()
export class UserReadBookEventHandler {
	constructor(private readonly redisService: RedisService) {}

	@OnEvent('USER_READ_BOOK')
	async handleUserReadBookEvent(event: UserReadBook) {
		const readPages: number[] = [];
		for (let pageIndex = event.start_page; pageIndex <= event.end_page; pageIndex++) {
			readPages.push(pageIndex)
		}
		this.redisService.addToSet(event.book.id.toString(), readPages)
	}
}
