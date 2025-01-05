import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateUserReadBookDto {
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @IsNumber()
    @IsNotEmpty()
    book_id: number;

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
