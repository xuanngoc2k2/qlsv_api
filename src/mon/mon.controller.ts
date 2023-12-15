import { Controller, Get } from "@nestjs/common";
import { MonService } from "./mon.service";

@Controller()
export class MonController {
    constructor(private readonly monService: MonService) { }
}
