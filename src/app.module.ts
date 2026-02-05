import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './utils/database.module';
import { EstudianteModule } from './estudiantes/estudiante.module';
import { CursoModule } from './cursos/curso.module';
import { CategoriaModule } from './categorias/categoria.module';
import { SeedModule } from './utils/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      formatError: (error) => {
        const graphQLFormattedError = {
          message: error.message,
          code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
          statusCode: error.extensions?.originalError?.['statusCode'] || 500,
          timestamp: new Date().toISOString(),
        };
        return graphQLFormattedError;
      },
    }),
    EstudianteModule,
    CursoModule,
    CategoriaModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
