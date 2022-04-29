import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile, UseInterceptors
} from "@nestjs/common";
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Cat } from './entities/cat.entity';
import { CatDto } from './dto/cat.dto';
import { CatsService } from './cats.service';
import { Request, Response, response } from 'express';
import { FileUploadDto } from "./dto/file-upload.dto";
import { FileInterceptor } from "@nestjs/platform-express";

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

  @HttpCode(HttpStatus.PARTIAL_CONTENT)
  @Patch('change-avatar')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: `list of the cats`,
    type: FileUploadDto,
  })
  async uploadAvatar(
    @UploadedFile() file,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      await this.catService.uploadAvatar(request.file);
      response.json({ message: 'User avatar successfully updated!' });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }
}
