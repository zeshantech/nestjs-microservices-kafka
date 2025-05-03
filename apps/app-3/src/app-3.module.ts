import { Module } from '@nestjs/common';
import { App3Controller } from './app-3.controller';
import { App3Service } from './app-3.service';

@Module({
  imports: [],
  controllers: [App3Controller],
  providers: [App3Service],
})
export class App3Module {}
