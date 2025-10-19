import { PartialType } from "@nestjs/mapped-types";
import { CreateProblemStatusHistoryDto } from "./create-problem-status-history.dto";

export class UpdateProblemStatusHistoryDto extends PartialType(CreateProblemStatusHistoryDto) {}
