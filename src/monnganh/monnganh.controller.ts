import { Controller, Get } from "@nestjs/common";
import { MonnganhService } from "./monnganh.service";

@Controller()
export class MonnganhController {
    constructor(private readonly monnganhService: MonnganhService) { }
}
