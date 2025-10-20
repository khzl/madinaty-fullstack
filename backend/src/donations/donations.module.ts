import { Module , forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DonationsService } from "./donations.service";
import { DonationsController } from "./donations.controller";
import { Donation } from "./entities/donation.entity";
// import foreign entity
import { UsersModule } from "src/users/users.module";
import { ProblemsModule } from "src/problems/problems.module";

@Module({
    imports: [
        // register only primary entity for this module 
        TypeOrmModule.forFeature([Donation]),
        // import foreign entity 
        forwardRef(() => UsersModule),
        forwardRef(() => ProblemsModule),
    ],
    controllers: [DonationsController],
    providers: [DonationsService],
    exports: [DonationsService],
})

export class DonationsModule {}