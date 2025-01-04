import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersReadBookDto } from './create-users-read-book.dto';

export class UpdateUsersReadBookDto extends PartialType(CreateUsersReadBookDto) {}
