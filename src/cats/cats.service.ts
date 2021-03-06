import { Injectable } from '@nestjs/common';
import { CatDto } from './dto/cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
  ) {
    // console.log(`catt`, catRepository);
  }
  async test(): Promise<void> {
    console.log('HELLO FROM THE CAT SERVICE');
  }
  async createANewCat(createCatDto: CatDto): Promise<Cat | void> {
    const cat = this.catRepository.create(createCatDto);
    return await this.catRepository.save(cat);
  }
  async uploadAvatar(file: any): Promise<void> {
    console.log('uploading avatar for cat');
  }

  async findCats(): Promise<Cat[]> {
    return await this.catRepository.find();
  }
}
