import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hola, este es mi microservicio de canciones. By Alejandra Colcha (:!';
  }
}
