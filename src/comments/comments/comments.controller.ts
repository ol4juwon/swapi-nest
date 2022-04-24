import { Body, Controller, Get, Post, Req, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('api/v1/comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Get()
  async index(@Request() req): Promise<any> {
    console.log(
      'inside controller',
      req.ip,
      req.connection.remoteAddress,
      req.headers,
    );
    const comments = await this.commentService.findAll();
    return comments;
  }
  @Post('film/:id/add')
  async create(@Request() req, comment: any): Promise<any> {
    console.log('inside controller', req.ip, req.connection.remoteAddress);
    try {
      return await this.commentService.create(comment);
    } catch (err) {
      console.log('error', err.message);
    }
    return [comment];
  }
}
