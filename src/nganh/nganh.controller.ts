import { Controller, Get } from "@nestjs/common";
import { NganhService } from "./nganh.service";

@Controller()
export class NganhController {
    constructor(private readonly nganhService: NganhService) { }
}
