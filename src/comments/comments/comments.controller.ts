import { Body, Controller, Get, Ip, Post, Req, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comments } from '../comments.entity';
import { RealIp } from 'nestjs-real-ip';

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
  async create(@Request() req, @RealIp() Ip, @Body() body): Promise<any> {
    console.log(
      'inside controller',
      Ip,
      body,
      req.ip,
      req.connection.remoteAddress,
    );
    const commentsPayload = new Comments();
    commentsPayload.film_id = req.params.id;
    commentsPayload.ip_address = req.ip;
    commentsPayload.content = body.content;
    // commentsPayload.timestamp = new Date().toUTCString();
    commentsPayload.username = body.username;
    let response;
    try {
      const { data, error } = await this.commentService.create(commentsPayload);

      if (error) {
        response = {
          error: error,
        };
        console.log(response, '<== error');
        return response;
      }
      response = {
        message: 'Comment added',
        createdComment: data,
      };
      console.log('dd', response);
      return response;
    } catch (err) {
      console.log('repl', err.message);
      console.log('error', err.message);
    }
    return [body];
  }
}
