import { Exclude } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(500)
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(100000)
    num_of_pages: number;
}
