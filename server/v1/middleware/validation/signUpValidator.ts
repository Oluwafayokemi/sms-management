import {
    IsDefined,
    IsString,
    MinLength,
    IsEmail,
    IsNumberString,
  } from 'class-validator';
  
  class SignUpValidator {
    @IsDefined()
    @IsString()
    @MinLength(3)
    first_name: string;
  
    @IsDefined()
    @IsString()
    @MinLength(3)
    last_name: string;

    @IsDefined()
    @IsString()
    @MinLength(3)
    user_name: string;
  
    @IsDefined()
    @IsEmail()
    email: string;
  
    @IsDefined()
    @IsNumberString()
    phone_number: number;

    @IsDefined()
    @IsString()
    password: string;

  }
  
  export default SignUpValidator;
  