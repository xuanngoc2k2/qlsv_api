import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Monnganh } from "./entities/monnganh.entity";

@Injectable()
export class MonnganhService {
    constructor(
        @InjectRepository(Monnganh)
        private readonly monnganhRepo: Repository<Monnganh>,
    ) { }

}
