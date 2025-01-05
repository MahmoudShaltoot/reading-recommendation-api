import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { Cache } from "cache-manager";
import { UserReadBook } from "src/users-read-book/entities/user-read-book.entity";

@Injectable()
export class UserReadBookEventHandler {
	constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

	@OnEvent('USER_READ_BOOK')
	async handleUserReadBookEvent(event: UserReadBook) {		
		// let start = event.start_page;
		// let end = event.end_page;
		// while(end > start) {
		// 	readPages
		// 	start++;;
		// }
		let pages = new Set([1, 2, 3 ,4, 5,6,5,5]);
		const response = await this.cacheManager.set('test-key', Array.from(pages));
		console.log(response);
	}
}
