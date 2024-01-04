import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Mon } from "./entities/mon.entity";

@Injectable()
export class MonService {
    constructor(
        @InjectRepository(Mon)
        private readonly monRepo: Repository<Mon>,
    ) { }
    async findAll() {
        return await this.monRepo.find();
    }

    async createMon(mon) {
        return await this.monRepo.create(mon);
    }
}
