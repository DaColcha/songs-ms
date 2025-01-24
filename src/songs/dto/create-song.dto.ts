import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateSongDto {
  @IsString()
  name: string;

  @IsString()
  path: string;

  @IsNumber()
  @IsPositive()
  plays: number;
}
