import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Category } from './entities/category.entity';
import { Question } from './entities/question.entity';
import { Post } from './entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, Question, Category, Post])],
})
export class PhotoModule {}
