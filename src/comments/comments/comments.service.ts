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
  async findByEpisodeId(id: number): Promise<any> {
    let comments = [];
    try {
      comments = await this.commentsRepository.find({
        where: {
          film_id: id,
        },
      });
      comments = await this.sortByRecentFirst(comments);
    } catch (err) {
      console.log(err.message);
    }
  }
  async countFilmComments(id: number): Promise<any> {
    const count = 0;
    console.log(id);
    try {
      //   count = this.commentsRepository.findAndCountBy({ film_id: id });
      return count;
    } catch (err) {
      //   console.log(err.message);
      return 0;
    }
  }

  async create(comments: Comments): Promise<any> {
    // console.log(comments);
    try {
      const commentc = await this.commentsRepository.save(comments);
      return { data: commentc };
    } catch (err) {
      console.log(err.message, '=>' + err.code, 'error', '\n\n' + err);
      if (err.code === 'ER_DUP_ENTRY') {
        return new Error('Duplicate Entry');
      }
      if (err.code === 'ER_BAD_NULL_ERROR') {
        const columnwithbadvalue = err.message.split("'")[1];
        console.log('bad table ', columnwithbadvalue);
        return { error: `invalid value in column - ${columnwithbadvalue}` };
      }
    }
  }
}
