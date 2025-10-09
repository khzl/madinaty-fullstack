import { PartialType } from '@nestjs/mapped-types';
import { CreateProblemStateDto } from './create-problem-state.dto';

export class UpdateProblemStateDto extends PartialType(CreateProblemStateDto) {}
