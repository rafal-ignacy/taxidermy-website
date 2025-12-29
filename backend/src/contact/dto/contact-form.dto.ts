import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class ContactFormDto {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  message!: string;
}

