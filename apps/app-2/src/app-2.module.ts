import { Module } from '@nestjs/common';
import { App2Controller } from './app-2.controller';
import { App2Service } from './app-2.service';

@Module({
  imports: [],
  controllers: [App2Controller],
  providers: [App2Service],
})
export class App2Module {}
