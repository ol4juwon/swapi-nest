import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Film } from '../films.entity';
import { FilmsService } from './films.service';
import { SWAPIService } from 'src/services/films/films.service';

@Controller('api/v1/films')
export class FilmsController {
  constructor(
    private filmsService: FilmsService,
    private swapiService: SWAPIService,
  ) {}
  @Get()
  async index(): Promise<any> {
    const movies = await this.swapiService.getFilms();
    // console.log('movies', await movies);
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

    return sendMovies;
    // return sendMovies.map((movie) => {
    //   return {
    //     title: movie.title,
    //     opening_crawl: movie.opening_crawl,
    //     director: movie.director,
    //     producer: movie.producer,
    //     release_date: movie.release_date,
    //   };
    // });
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
