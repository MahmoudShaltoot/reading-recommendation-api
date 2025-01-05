import { PartialType } from '@nestjs/mapped-types';
import { CreateUserReadBookDto } from './create-user-read-book.dto';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class UpdateUserReadBookDto extends PartialType(CreateUserReadBookDto) {
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(100000)
    start_page: number

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(100000)
    end_page: number
}
