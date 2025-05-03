import { Test, TestingModule } from '@nestjs/testing';
import { App3Controller } from './app-3.controller';
import { App3Service } from './app-3.service';

describe('App3Controller', () => {
  let app3Controller: App3Controller;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [App3Controller],
      providers: [App3Service],
    }).compile();

    app3Controller = app.get<App3Controller>(App3Controller);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(app3Controller.getHello()).toBe('Hello World!');
    });
  });
});
