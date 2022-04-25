import { Controller, Query } from '@nestjs/common';
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
  async index(@Response() res, @Query() query): Promise<any> {
    // console.log('query', query);
    const characters = await this.swapiService.getCharacters();
    if (characters.error) {
      return res.status(400).send({ error: 'Error fetching characters' });
    }
    let sendCharacters = [];
    sendCharacters = await characters.map((character) => {
      //   console.log('characters', character);
      const sendCharacter = {
        name: character.name,
        height: character.height,
        gender: character.gender,
        mass: character.mass,
        hair_color: character.hair_color,
      };
      return sendCharacter;
    });
    if (query.sortby == 'name' && query.order == 'asc') {
      sendCharacters = sendCharacters.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    } else if (query.sortby == 'name' && query.order == 'desc') {
      sendCharacters = sendCharacters.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
    }
    if (query.sortby == 'height' && query.order == 'asc') {
      sendCharacters = sendCharacters.sort((a, b) => {
        if (a.height < b.height) {
          return -1;
        }
        if (a.height > b.height) {
          return 1;
        }
        return 0;
      });
    } else if (query.sortby == 'height' && query.order == 'desc') {
      sendCharacters = sendCharacters.sort((a, b) => {
        if (a.height > b.height) {
          return -1;
        }
        if (a.height < b.height) {
          return 1;
        }
        return 0;
      });
    }
    // filter by gender
    if (query.filter) {
      if (
        query.filter.toLowerCase() == 'male' ||
        query.filter.toLowerCase() == 'female'
      ) {
        sendCharacters = sendCharacters.filter((xter) => {
          //   console.log('x' + xter.gender);
          return xter.gender == query.filter.toLowerCase();
        });
      }
    }
    const totalHeight = sendCharacters.reduce((acc, curr) => {
      //   console.log(acc, curr.height);
      return parseInt(acc) + parseInt(curr.height);
    }, 0);
    const convertheighttoFeet = this.convertcmtoFeet(totalHeight);
    const convertToStringformat = await this.convertFeetinDecimalToftinches(
      await convertheighttoFeet,
    );
    res.status(200).send({
      message: 'Request successful',
      character: sendCharacters,
      totalHeight: {
        totalHeight: totalHeight + 'cm',
        heightinFeet: convertToStringformat,
      },
    });
  }
  async convertcmtoFeet(height: number): Promise<number> {
    const convertheighttoFeet = height / 30.48;
    return convertheighttoFeet;
  }
  async convertFeetinDecimalToftinches(height: number): Promise<string> {
    const feet = Math.floor(height);
    const inches = Math.round((height - feet) * 12);
    return feet + 'ft ' + inches + 'inches';
  }
}
