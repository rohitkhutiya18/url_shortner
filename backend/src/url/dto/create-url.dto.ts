import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class CreateUrlDto {
    @Transform(({ value }) => value.trim())

    @IsString()
    title!:string

    @IsString()
    originalUrl!:string

    @IsString()
    shortUrl!:string

    @IsString()
    @IsOptional()
    alias!:string
}
