import { ArgsType, Field, Int } from '@nestjs/graphql';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

@ArgsType()
export class PaginationDto {
    @ApiPropertyOptional({
        description: 'Number of items to return',
        default: 10,
        minimum: 1,
        example: 10,
    })
    @Field(() => Int, { defaultValue: 10, nullable: true })
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(1)
    limit?: number = 10;

    @ApiPropertyOptional({
        description: 'Number of items to skip',
        default: 0,
        minimum: 0,
        example: 0,
    })
    @Field(() => Int, { defaultValue: 0, nullable: true })
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(0)
    offset?: number = 0;
}
