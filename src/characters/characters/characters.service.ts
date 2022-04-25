import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Characters } from '../characters.entity';
import { SWAPIService } from 'src/services/films/films.service';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Characters)
    private characterRepository: Repository<Characters>,
    private swapiService: SWAPIService,
  ) {}

  async findAll(): Promise<Characters[]> {
    let characters = [];
    try {
      characters = await this.characterRepository.find();
    } catch (err) {
      console.log(err.message);
    }

    console.log('Characters', 'characters');
    return characters;
  }
  //   async findbyandsortfilter(filter: any): Promise<Characters[]> {
  //     let characters = [];
  //     try {
  //       characters = await this.characterRepository.find({
  //         where: {
  //           name,
  //         },
  //       });
  //     } catch (err) {
  //       console.log(err.message);
  //     }

  //     console.log('Characters', 'characters');
  //     return characters;
  //   }
}
