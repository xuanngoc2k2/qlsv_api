import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Nganh } from "./entities/nganh.entity";

@Injectable()
export class NganhService {
    constructor(
        @InjectRepository(Nganh)
        private readonly nganhRepo: Repository<Nganh>,
    ) { }

}
