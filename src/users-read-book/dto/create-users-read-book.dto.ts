import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateUsersReadBookDto {
    @IsNumber()
    @IsNotEmpty()
    user_id: string;

    @IsNumber()
    @IsNotEmpty()
    book_id: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(100000)
    start_page: string

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(100000)
    end_page: string
}
