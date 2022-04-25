import {
  Body,
  Controller,
  Get,
  Ip,
  Param,
  Post,
  Req,
  Request,
  Response,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comments } from '../comments.entity';
import { RealIp } from 'nestjs-real-ip';
import { ApiOkResponse } from '@nestjs/swagger';
// import { Film } from 'src/films/films.entity';

@Controller('api/v1/comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Get()
  @ApiOkResponse({ status: 200, type: Comments, isArray: true })
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
  @Get('film/:id/get')
  @ApiOkResponse({ status: 200, type: Comments })
  async findById(@Param('id') id: number): Promise<any> {
    const comments = await this.commentService.findbyEpisode(id);
    return comments;
  }

  @Post('film/:id/add')
  @ApiOkResponse({ status: 201, type: Comments })
  async create(
    @Request() req,
    @RealIp() Ip,
    @Response() res,
    @Body() body,
  ): Promise<any> {
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
        return res.status(401).send(response);
      }
      response = {
        message: 'Comment added',
        createdComment: data,
      };
      console.log('dd', response);
      return res.status(201).send(response);
    } catch (err) {
      console.log('repl', err.message);
      console.log('error', err.message);
    }
    return [body];
  }
}
