import {
    IsDefined,
    IsString,
    MinLength,
  } from 'class-validator';
  
  class messageValidator {
    @IsDefined()
    @IsString()
    @MinLength(3)
    body: string;
  
    @IsDefined()
    @IsString()
    @MinLength(3)
    to_user: string;
  }
  
  export default messageValidator;
  