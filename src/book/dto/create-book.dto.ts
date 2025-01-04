import { IsInt, IsNotEmpty, IsNumber, IsString, Max, MaxLength, MinLength } from "class-validator";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(500)
    title: string;

    @IsNumber()
    @IsNotEmpty()
    @IsInt()
    @Max(10000)
    num_of_pages: number;
}
