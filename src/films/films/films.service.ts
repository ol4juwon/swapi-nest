import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from '../films.entity';
// import { AxiosResponse } from 'axios';
import { DeleteResult } from 'typeorm';
@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film) private filmRepository: Repository<Film>,
  ) {}
  async findAll(): Promise<Film[]> {
    let films = [];
    try {
      films = await this.filmRepository.find();
    } catch (err) {
      console.log(err.message);
    }

    console.log('Filmss', 'films');
    return films;
  }
  async create(film: Film): Promise<Film> {
    //   const movies = await this.http.get<Film[]>(
    //     `https://api.themoviedb.org/3/movie/${film.id}?api_key=${process.env.TMDB_API_KEY}`,
    //     );
    console.log('movies');
    console.log(film);
    try {
      return await this.filmRepository.save(film);
    } catch (err) {
      console.log(err);
    }
  }
  async delete(id): Promise<DeleteResult> {
    return await this.filmRepository.delete(id);
  }
  async update(film: Film): Promise<UpdateResult> {
    return await this.filmRepository.update(film.id, film);
  }
}
