import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/entities/task.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['../src/schema/graphql'],
    }),
    UsersModule,
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'pruebajunior',
      entities: [User, Task],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
