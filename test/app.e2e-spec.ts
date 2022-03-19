import { FindTopPageDto } from './../src/top-page/dto/find-top-page.dto';
import { CreatedTopPageDto } from './../src/top-page/dto/created-top-page.dto';
import { FindProductDto } from './../src/product/dto/find-product.dto';
import { LoginAuthDto } from './../src/auth/dto/auth-login.dto';
import { RegistrationAuthDto } from './../src/auth/dto/auth-registration.dto';
import { CreatedReviewDto } from './../src/review/dto/created-revirw.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { disconnect, Types } from 'mongoose';
import { CreatedProductDto } from 'src/product/dto/created-product.dto';
describe('AppController (e2e)', () => {
  let createdReviewId: string;
  let createProductId: Types.ObjectId;
  let createdTopPageId: string;
  const testCreateProductDto: CreatedProductDto = {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQKI2yBSdiEWLYkdfUhpRBgYM0ISYJ4CzNhc5wo2hIbAefdwxNktDm7K2n0gEoKkDV2n0&usqp=CAU',
    title: 'flower',
    price: 4,
    credit: 2,
    calculatedRating: 3,
    description: 'It is extremely beautiful flower',
    advantages: 'fresh',
    disadvantages: 'deteriorates quickly',
    categories: ['cars'],
    tags: ['cars'],
    characteristic: [
      {
        name: 'grade',
        value: 'Tulip',
      },
    ],
  };
  const testCreateTopPage: CreatedTopPageDto = {
    firstCategory: 0,
    secondCategory: 'cars',
    title: 'big cars',
    category: 'cars',
    advantages: [{ title: 'big', description: 'car is big' }],
    seoText: 'car',
    tagsTitle: 'cart',
    tags: ['cart'],
  };
  const testFindTopPage: FindTopPageDto = {
    firstCategory: 1,
  };
  const testPatchTopPage = {
    firstCategory: 1,
    secondCategory: 'cars',
    title: 'big cat',
    category: 'cars',
    advantages: [{ title: 'big', description: 'car is big' }],
    seoText: 'car',
    tagsTitle: 'cart',
    tags: ['cart'],
  };
  let testReviewDto: CreatedReviewDto = {
    name: 'test',
    title: 'title test',
    description: 'description test',
    rating: 5,
    productId: createProductId,
  };
  const testRegistrationAuthDto: RegistrationAuthDto = {
    email: `test@test${Math.random()}.com`,
    password: 'test',
  };
  const testLoginAuthDto: LoginAuthDto = {
    email: 'test@test1.com',
    password: 'test',
  };
  const testModelProduct = {
    _id: createProductId,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQKI2yBSdiEWLYkdfUhpRBgYM0ISYJ4CzNhc5wo2hIbAefdwxNktDm7K2n0gEoKkDV2n0&usqp=CAU',
    title: 'flower',
    price: 4,
    oldPrice: 7,
    credit: 2,
    calculatedRating: 3,
    description: 'It is extremely beautiful flower',
    advantages: 'fresh',
    disadvantages: 'deteriorates quickly',
    categories: ['cars'],
    tags: ['cars'],
    characteristic: [
      {
        name: 'grade',
        value: 'Tulip',
      },
    ],
  };
  const testFindByProductCategory: FindProductDto = {
    category: 'flowers',
    limit: 1,
  };
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
      .get('/')
      .expect(200)
      .expect('My Nest App!');
  });
  it('/auth/registration (POST)', async () => {
    return request(app.getHttpServer())
      .post('/auth/registration')
      .send(testRegistrationAuthDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        expect(body._id).toBeDefined();
      });
  });
  it('/auth/login (POST)', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(testLoginAuthDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body._id).toBeDefined();
      });
  });
  it('/product/create (POST)', async () => {
    return request(app.getHttpServer())
      .post('/product/create')
      .send(testCreateProductDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createProductId = body._id;
        expect(createProductId).toBeDefined();
      });
  });
  it('/product/:id (GET)', async () => {
    return request(app.getHttpServer())
      .get('/product/' + createProductId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body._id).toBeDefined();
      });
  });
  it('/product/:id (PATCH)', async () => {
    return request(app.getHttpServer())
      .patch('/product/' + createProductId)
      .send(testModelProduct)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body._id).toBe(createProductId);
      });
  });
  it('/product/:id (POST)', async () => {
    return request(app.getHttpServer())
      .post('/product')
      .send(testFindByProductCategory)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(testFindByProductCategory.limit);
      });
  });
  it('/product/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/product/' + createProductId)
      .expect(200);
  });
  it('/review/create (POST)', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send((testReviewDto = { ...testReviewDto, productId: createProductId }))
      .expect(201)
      .then(({ body }: request.Response) => {
        createdReviewId = body._id;
        expect(createdReviewId).toBeDefined();
      });
  });
  it('/review/create (POST) --fail', () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send(
        (testReviewDto = {
          ...testReviewDto,
          productId: createProductId,
          rating: 0,
        }),
      )
      .expect(400);
  });
  it('/review/byProduct/:id (GET)', async () => {
    return request(app.getHttpServer())
      .get('/review/byProduct/' + createProductId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1);
      });
  });

  it('/review/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/review/' + createdReviewId)
      .expect(200);
  });
  it('/review/deleteAllReviewsByProductId/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/review/deleteAllReviewsByProductId/' + createProductId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.acknowledged).toBe(true);
      });
  });
  it('/top-page/create (POST)', async () => {
    return request(app.getHttpServer())
      .post('/top-page/create')
      .send(testCreateTopPage)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdTopPageId = body._id;
        expect(createdTopPageId).toBeDefined();
      });
  });
  it('/top-page/:id (PATCH)', async () => {
    return request(app.getHttpServer())
      .patch('/top-page/' + createdTopPageId)
      .send(testPatchTopPage)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body._id).toBe(createdTopPageId);
      });
  });
  it('/top-page/:id (GET)', async () => {
    return request(app.getHttpServer())
      .get('/top-page/' + createdTopPageId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.title).toBe('big cat');
      });
  });
  it('/top-page (POST)', async () => {
    return request(app.getHttpServer())
      .post('/top-page')
      .send(testFindTopPage)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1);
      });
  });
  it('/top-page/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/top-page/' + createdTopPageId)
      .expect(200);
  });
  afterAll(() => {
    disconnect();
  });
});
