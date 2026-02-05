import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';

@ArgsType()
export class FindEstudiantesArgs extends PaginationDto {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    nombre?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    apellido?: string;
}
