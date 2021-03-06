import { Module } from '@nestjs/common';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comments])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
