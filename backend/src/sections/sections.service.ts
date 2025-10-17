import { 
    Injectable,
    NotFoundException,
    ConflictException 
}
from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Section } from "./entities/section.entity";
import { CreateSectionDto } from "./dto/create-section.dto";
import { UpdateSectionDto } from "./dto/update-section.dto";

@Injectable()
export class SectionsService {
    constructor(
        @InjectRepository(Section)
        private readonly sectionRepo: Repository<Section>,
    ){}

    // find by title 
    async findByTitle(title: string): Promise<Section | null>{
        return this.sectionRepo.findOne({
            where: {title}
        });
    }

    // find All 
    async findAll(parentOnly: boolean = false): Promise<Section[]>{
        let whereClause: any = {};
        if(parentOnly){
            whereClause = {parent_section: null};
        }
        return this.sectionRepo.find({
            where: whereClause,
            relations: ['parent_section','children','problems'],
            order: {id: 'ASC'},
        });
    }

    // find one
    async findOne(id: number): Promise<Section>{
        const section = await this.sectionRepo.findOne({
            where: {id},
            relations: ['parent_section','children','problems'],
        });

        if(!section)
            throw new NotFoundException(`Section With ID ${id} Not Found`);

        return section;
    }

    // create new sections
    async create(sectionDto: CreateSectionDto): Promise<Section>{

        const existingSection = await this.findByTitle(sectionDto.title);

        if (existingSection){
            throw new ConflictException(`Section With Title "${sectionDto.title}" Already Exists`);
        }

        if (sectionDto.parent_section_id){
            await this.findOne(sectionDto.parent_section_id);
        }

        const newSection = this.sectionRepo.create(sectionDto);
        return this.sectionRepo.save(newSection);

    }

    // update section
    async update(id: number, sectionDto: UpdateSectionDto): Promise<Section>{
        const section = await this.findOne(id);

        if(sectionDto.parent_section_id){
            if (sectionDto.parent_section_id === id){
                throw new ConflictException('A Section Cannot be its Own Parent.');
            }

            await this.findOne(sectionDto.parent_section_id);
        }

        const updated = Object.assign(section,sectionDto);
        return this.sectionRepo.save(updated);
    }

    // remove section
    async remove(id: number): Promise<{ message: string}>{
        const section = await this.findOne(id);
        await this.sectionRepo.remove(section);
        return {
            message: `Section With ID ${id} and its associated records deleted successfully`
        };
    }

}