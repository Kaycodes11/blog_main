import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath
} from "@nestjs/swagger";
import { Cat } from "./entities/cat.entity";
import { CatDto } from "./dto/cat.dto";
import { CatsService } from "./cats.service";
import { Request, Response } from "express";
import { FileUploadDto } from "./dto/file-upload.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { PaginatedDto } from "./dto/paginated-dto";
import { Roles } from "../shared/decorators/roles.decorator";
import { UserRoles } from "../shared/entities/role.entity";

@ApiTags('cats')
@ApiExtraModels(PaginatedDto)
@ApiBearerAuth()
@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  // 1: here, we specify the response will have allOf PaginatedDto & results property will be of type Array<CatDto>

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginatedDto) },
        {
          properties: {
            results: { type: 'array', items: { $ref: getSchemaPath(CatDto) } },
          },
        },
      ],
    },
  })
  @Get()
  async findCats(
    @Res() response: Response,
  ): Promise<PaginatedDto<CatDto> | any> {
    const cats = await this.catService.findCats();
    console.log(cats);
    return response.json(cats);
  }

  /*
   @ApiPaginatedResponse(CatDto)
   async getCats(): Promise<PaginatedDto<CatDto>> {
     // when client request to this api that will be like this
      findAll(): Observable<{ total: number, limit: number, offset: number, results: CatDto[] }>
   //   now after adding title property on ApiPaginatedResponse it would be like this on client
   findAll(): <PaginatedResponseOfCatDto>
   }
  */

  @HttpCode(HttpStatus.CREATED)
  @Post('new')
  @Roles(UserRoles.GUEST)
  @ApiCreatedResponse({ type: Cat, description: 'new cat has registered' })
  @ApiForbiddenResponse({ description: 'error here' })
  async create(@Body() createCatDto: CatDto): Promise<void | Cat> {
    // without it just returns promise ; with await it extracts the data which is what needed here
    const newCat = await this.catService.createANewCat(createCatDto);
    // console.log(newCat);
    return newCat;
  }

  @HttpCode(HttpStatus.PARTIAL_CONTENT)
  @Patch('upload-avatar')
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
