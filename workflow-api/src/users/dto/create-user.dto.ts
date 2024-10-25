import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "../entities/users.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        description: 'The unique username of the user',
        example: 'john_doe',
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'secure_password',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
    
    @ApiProperty({
        description: 'The role of the user',
        example: 'USER',
        enum: Role
    })
    @IsEnum(Role)
    role: Role;
}
