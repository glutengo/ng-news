import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from '../web/rest/category.controller';
import { CategoryRepository } from '../repository/category.repository';
import { CategoryService } from '../service/category.service';
import { CategoryResolver } from '../web/graphql/category.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([CategoryRepository])],
    controllers: [CategoryController],
    providers: [CategoryService, CategoryResolver],
    exports: [CategoryService],
})
export class CategoryModule {}
