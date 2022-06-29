import { Test, TestingModule } from '@nestjs/testing';
import { GithubApi } from './github-api';

describe('GithubApi', () => {
  let provider: GithubApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubApi],
    }).compile();

    provider = module.get<GithubApi>(GithubApi);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
