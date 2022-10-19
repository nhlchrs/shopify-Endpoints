import { IsNumber, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  public first_name: string;

  @IsString()
  public last_name: string;

  @IsNumber()
  public phone: number;
}
