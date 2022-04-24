import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, tap } from 'rxjs';

@Injectable()
export class SWAPIService {
  constructor(private http: HttpService) {}

  async getFilms() {
    try {
      const response = await lastValueFrom(
        this.http.get('https://swapi.dev/api/films').pipe(map((res) => res)),
      );
      console.log('response', response.data.results);
      return response.data.results;
    } catch (err) {
      console.log(err.message);
      return err.message;
    }
  }
}
