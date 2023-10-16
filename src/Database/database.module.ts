// app.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  imports: [],
  controllers: [],
  providers: [DatabaseService],
})
export class DatabaseModule implements OnModuleInit {
  constructor(private readonly databaseService: DatabaseService) {}

  async onModuleInit() {
    // Ejecutar el insert into al iniciar la aplicación
    await this.databaseService.insertIntoRoles();
  }
}
