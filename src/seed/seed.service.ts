import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
		private readonly authService: AuthService,
	) { }
 
	async seed() {
		const isAdminExist = await this.userRepository.findOneBy({ username: process.env.ADMIN_USERNAME });
		if (isAdminExist) {
			return true;
		}

		if (!process.env.ADMIN_ACCOUNT_NAME || !process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
			throw new InternalServerErrorException('Admin credentials are missing')
		}

		const adminCred = {
			full_name: process.env.ADMIN_ACCOUNT_NAME,
			username: process.env.ADMIN_USERNAME,
			password: process.env.ADMIN_PASSWORD,
			is_admin: true
		}
		await this.authService.register(adminCred);
		console.log('Admin account created');
	}

	async clear() {
		await this.userRepository.delete({ username: process.env.ADMIN_USERNAME });
	}
}