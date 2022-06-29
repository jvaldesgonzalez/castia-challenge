import { Test, TestingModule } from '@nestjs/testing';
import { GithubUsersController } from './github-users.controller';

describe('GithubUsersController', () => {
  let controller: GithubUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GithubUsersController],
    }).compile();

    controller = module.get<GithubUsersController>(GithubUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
