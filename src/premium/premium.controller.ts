import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PremiumService } from './premium.service';
import { CreatePremiumDto } from './dto/create-premium.dto';
import { UpdatePremiumDto } from './dto/update-premium.dto';

@Controller('premium')
export class PremiumController {
  constructor(private readonly premiumService: PremiumService) {}

  @Post()
  create(@Body() createPremiumDto: CreatePremiumDto) {
    return this.premiumService.create(createPremiumDto);
  }

  @Post('/Pago')
  createPay(@Body() createPremiumDto: CreatePremiumDto) {
    return this.premiumService.createPay(createPremiumDto);
  }
}
