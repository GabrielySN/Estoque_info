import { Test, TestingModule } from "@nestjs/testing";
import { NestExpressApplication } from "@nestjs/platform-express";
import request from "supertest";
import { App } from "supertest/types";
import { join } from "node:path";
import { AppModule } from "./../src/app.module";

describe("AppController (e2e)", () => {
  let app: NestExpressApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication<App>>();
    app.useStaticAssets(join(__dirname, "..", "public"));
    app.setBaseViewsDir(join(__dirname, "..", "views"));
    app.setViewEngine("hbs");
    await app.init();
  });

  it("/ (GET)", () => {
    return request(app.getHttpServer())
      .get("/")
      .expect(200)
      .expect((response) => {
        expect(response.text).toContain("Hello world!");
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
