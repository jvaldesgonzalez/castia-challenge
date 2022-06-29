import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { GithubApi } from './github-api';

describe('GithubApi', () => {
  let provider: GithubApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [GithubApi],
    }).compile();

    provider = module.get<GithubApi>(GithubApi);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should be a list', async () => {
    let queries = ['malangamalanga', 'joseph', 'jvaldesgonzalez'];
    for (let q of queries) {
      expect(provider.searchUsers(q)).resolves.toBeInstanceOf(Array);
    }
  });
});
