import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Cat } from './entities/cat.entity';
import { CatDto } from './dto/cat.dto';
import { CatsService } from './cats.service';
import { response } from 'express';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('new')
  @ApiCreatedResponse({ type: Cat, description: 'new cat has registered' })
  @ApiForbiddenResponse({ description: 'error here' })
  async create(@Body() createCatDto: CatDto): Promise<void | Cat> {
    // without it just returns promise ; with await it extracts the data which is what needed here
    const newCat = await this.catService.createANewCat(createCatDto);
    console.log(newCat);
    return newCat;
  }
}
