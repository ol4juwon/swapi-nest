import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comments } from '../comments.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private commentsRepository: Repository<Comments>,
  ) {}

  async sortByRecentFirst(comments: Comments[]): Promise<Comments[]> {
    return await comments.sort((a, b) => {
      console.log(new Date(a.timestamp), new Date(b.timestamp));
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }

  async findAll(): Promise<Comments[]> {
    let comments = [];
    try {
      comments = await this.commentsRepository.find();
      comments = await this.sortByRecentFirst(comments);
    } catch (err) {
      console.log(err.message);
    }

    console.log('Comments', 'comments');
    return comments;
  }

  async create(comments: Comments): Promise<Comments> {
    console.log(comments);
    try {
      return await this.commentsRepository.save(comments);
    } catch (err) {
      console.log(err);
    }
  }
}
