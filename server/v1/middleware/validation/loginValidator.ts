import {
    IsDefined,
    IsString,
    MinLength,
    IsEmail,
    IsOptional
  } from 'class-validator';
  
  class LoginValidator {
    @IsOptional()
    @IsString()
    @MinLength(3)
    user_name: string;
    
    @IsOptional()  
    @IsEmail()
    email: string;

    @IsDefined()
    @IsString()
    password: string;

  }
  
  export default LoginValidator;
  