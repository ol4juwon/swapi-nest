import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  Response,
} from '@nestjs/common';
import { Film } from '../films.entity';
import { FilmsService } from './films.service';
import { SWAPIService } from 'src/services/films/films.service';
import { CommentsService } from '../../comments/comments/comments.service';

@Controller('api/v1/films')
export class FilmsController {
  constructor(
    private filmsService: FilmsService,
    private swapiService: SWAPIService,
  ) {}
  @Get()
  async index(@Response() res): Promise<any> {
    const movies = await this.swapiService.getFilms();
    if (movies.error) {
      return res.status(400).send({ error: 'Error fetching films' });
    }

    let sendMovies = [];

    sendMovies = movies.map((movie) => {
      const film = new Film();
      film.title = movie.title;
      film.episode_id = movie.episode_id;
      film.release_date = movie.release_date;
      film.director = movie.director;
      film.producer = movie.producer;
      film.opening_crawl = movie.opening_crawl;
      film.comment_count = 0;
      film.url = movie.url;
      return film;
    });
    const sorted = sendMovies.sort((a, b) => {
      console.log(a.release_date, b.release_date);
      return (
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    });
    return res.status(202).send({
      message: 'Films successfully fetched',
      movies: sorted,
      count: sendMovies.length,
    });
  }
  @Post('create')
  async create(@Body() filmData: Film): Promise<any> {
    console.log('inside controller', filmData);
    try {
      return await this.filmsService.create(filmData);
    } catch (err) {
      console.log('error', err.message);
    }
    return [filmData];
  }
  @Put('update/:id')
  async update(@Body() filmData: Film, @Param('id') id): Promise<any> {
    filmData.id = Number(id);
    return await this.filmsService.update(filmData);
  }
  @Delete('delete/:id')
  async delete(@Param('id') id): Promise<any> {
    return await this.filmsService.delete(id);
  }
}
