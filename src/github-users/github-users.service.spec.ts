import { Test, TestingModule } from '@nestjs/testing';
import { GithubUsersService } from './github-users.service';

describe('GithubUsersService', () => {
  let service: GithubUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubUsersService],
    }).compile();

    service = module.get<GithubUsersService>(GithubUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
