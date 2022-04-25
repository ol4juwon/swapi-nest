import { Controller } from '@nestjs/common';
import { SWAPIService } from 'src/services/films/films.service';
import { CharactersService } from './characters.service';
import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  Response,
} from '@nestjs/common';
@Controller('api/v1/characters')
export class CharactersController {
  constructor(
    private characterService: CharactersService,
    private swapiService: SWAPIService,
  ) {}
  @Get()
  async index(@Response() res) {
    const characters = await this.swapiService.getCharacters();
    if (characters.error) {
      return res.status(400).send({ error: 'Error fetching characters' });
    }
    let sendCharacters = [];
    sendCharacters = await characters.map((character) => {
      console.log('characters', character);
      const sendCharacter = {
        name: character.name,
        //     height: character.height,
        //     mass: character.mass,
        hair_color: character.hair_color,
      };
      return sendCharacter;
    });
    res.status(200).send({ sendCharacters });
  }
}
