import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { UserReadBook } from "src/users-read-book/entities/user-read-book.entity";

@Injectable()
export class UserReadBookEventHandler {
	@OnEvent('USER_READ_BOOK')
	handleUserReadBookEvent(event: UserReadBook) {
		console.log(event);
	}
}
