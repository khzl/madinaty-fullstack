import { 
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    ParseIntPipe,
    UseGuards,
    Query,
}
from "@nestjs/common";
import { 
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiParam,
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiConflictResponse,
    ApiNotFoundResponse,
}
from "@nestjs/swagger";
import { SectionsService } from "./sections.service";
import { CreateSectionDto } from "./dto/create-section.dto";
import { UpdateSectionDto } from "./dto/update-section.dto";
import { Section } from "./entities/section.entity";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { UserRole } from "src/users/entity/user.entity";

@ApiTags('sections')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('sections')
export class SectionsController {
    constructor(private readonly sectionsService: SectionsService) {}


    // find all sections
    @Get()
    @ApiOperation({
        summary: 'Retrieve All Sections With Relations'
    })
    @ApiResponse({
        status: 200,
        description: 'List Of All Sections',
        type: [Section]
    })
    findAll(@Query('parentOnly') parentOnly?: string){
        const isParentOnly = parentOnly === 'true';
        return this.sectionsService.findAll(isParentOnly);
    }


    // find section by id
    @Get(':id')
    @ApiOperation({
        summary: 'Retrieve a Section By ID'
    })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'The ID Of The Section'
    })
    @ApiResponse({
        status: 200,
        description: 'The Section Record',
        type: Section
    })
    @ApiNotFoundResponse({
        description: 'Section Not Found.'
    })
    findOne(@Param('id', ParseIntPipe)id: number){
        return this.sectionsService.findOne(id);
    }


    // create Section (Admin Only)
    @Post()
    @Roles(UserRole.GOVERNMENT)
    @ApiOperation({
        summary: 'Create a New Administrative Section'
    })
    @ApiBody({
        type: CreateSectionDto
    })
    @ApiResponse({
        status: 201,
        description: 'Section Created Successfully',
        type: Section
    })
    @ApiConflictResponse({
        description: 'Section With This Title Already Exists'
    })
    @ApiForbiddenResponse({
        description: 'Forbidden (Requires Government Role)'
    })
    create(@Body() SectionDto: CreateSectionDto){
        return this.sectionsService.create(SectionDto);
    }

    // update section (Admin Only)
    @Patch(':id')
    @Roles(UserRole.GOVERNMENT)
    @ApiOperation({
        summary: 'Update an Existing Section By ID'
    })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'The ID Of The Section To Update'
    })
    @ApiBody({
        type: UpdateSectionDto
    })
    @ApiResponse({
        status: 200,
        description: 'The Updated Section Record',
        type: Section
    })
    @ApiConflictResponse({
        description: 'Section Not Found'
    })
    @ApiForbiddenResponse({
        description: 'Forbidden (Requires Government Role)'
    })
    update(@Param('id',ParseIntPipe)id: number,@Body() UpdateDto: UpdateSectionDto){
        return this.sectionsService.update(id,UpdateDto);
    }

    // Delete Section (Admin Only)
    @Delete(':id')
    @Roles(UserRole.GOVERNMENT)
    @ApiOperation({
        summary: 'Delete a Section By ID'
    })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'The ID Of The Section To Delete'
    })
    @ApiResponse({
        status: 200,
        description: 'Section Deleted Successfully'
    })
    @ApiNotFoundResponse({
        description: 'Section Not Found'
    })
    @ApiForbiddenResponse({
        description: 'Forbidden (Requires Government role)'
    })
    remove(@Param('id',ParseIntPipe)id: number){
        return this.sectionsService.remove(id);
    }

}