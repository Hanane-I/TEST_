import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/numberConvert')
      .expect(200)
      .expect('Hello World!');
  });

  //date normale
  it('Convert simple date to roman',() =>{
    return request(app.getHttpServer())
    .get('/numberConvert/01-10-2020')
    .expect(200)
    .expect('I-X-MMXX');
  });

  //date avec mois 2 + annee non bissextile (2021) => 28 j
  it('Convert simple date to roman',() =>{
    return request(app.getHttpServer())
    .get('/numberConvert/28-02-2021')
    .expect(200)
    .expect('XXVIII-II-MMXXI');
  });


  //date avec mois 2 + annee bissextile (2020) => 29 j
  it('Convert simple date to roman',() =>{
    return request(app.getHttpServer())
    .get('/numberConvert/29-02-2020')
    .expect(200)
    .expect('XXIX-II-MMXX');
  });

  it('Convert simple date to roman',() =>{
    return request(app.getHttpServer())
    .get('/numberConvert/30-02-2020')
    .expect(200)
    .expect('Erreur. Veuillez saisir une date correcte');
  });

  //date erronée
  it('Convert simple date to roman',() =>{
    return request(app.getHttpServer())
    .get('/numberConvert/40-06-2020')
    .expect(200)
    .expect('Erreur. Veuillez saisir une date correcte');
  });

  //jour = 0
  it('Convert simple date to roman',() =>{
    return request(app.getHttpServer())
    .get('/numberConvert/0-06-2020')
    .expect(200)
    .expect('Erreur. Veuillez saisir une date correcte');
  });

  it('Convert simple date to roman',() =>{
    return request(app.getHttpServer())
    .get('/numberConvert/10-06-0')
    .expect(200)
    .expect('Erreur. Veuillez saisir une date correcte');
  });

  it('Convert simple date to roman',() =>{
    return request(app.getHttpServer())
    .get('/numberConvert/10-06')
    .expect(200)
    .expect('Erreur. Veuillez saisir une date correcte');
  });
});
