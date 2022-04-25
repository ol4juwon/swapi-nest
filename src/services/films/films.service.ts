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
      return response.data.results;
    } catch (err) {
      console.log(err + ' \n\n');
      if (err.response) {
        return { error: err.response.data };
      }
      if (err.request) {
        return { error: err.request.data };
      }
      if (err.code === 'ECONNREFUSED') {
        return { error: 'No connection to SWAPI' };
      }
      return err.message;
    }
  }
  async getCharacters() {
    try {
      const response = await lastValueFrom(
        this.http.get('https://swapi.dev/api/people').pipe(map((res) => res)),
      );
      return response.data.results;
    } catch (err) {
      //   console.log(err + ' \n\n');
      if (err.response) {
        return { error: err.response.data };
      }
      if (err.request) {
        return { error: err.request.data };
      }
      if (err.code === 'ECONNREFUSED') {
        return { error: 'No connection to SWAPI' };
      }
      return err.message;
    }
  }
}
