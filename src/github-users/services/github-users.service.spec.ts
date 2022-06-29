import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { randomInt } from 'crypto';
import { GithubApi } from '../providers/github-api';
import { GithubUsersService } from './github-users.service';

describe('GithubUsersService', () => {
  let service: GithubUsersService;
  let api: GithubApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [GithubUsersService, GithubApi],
    }).compile();

    service = module.get<GithubUsersService>(GithubUsersService);
    api = module.get<GithubApi>(GithubApi);
    jest.spyOn(api, 'searchUsers').mockImplementation(async (_q) => {
      return [
        {
          url: 'testingurl1.com',
        },
        {
          url: 'testingurl2.com',
        },
        {
          url: 'testingurl3.com',
        },
        {
          url: 'testingurl4.com',
        },
      ];
    });
    jest.spyOn(api, 'getFullUser').mockImplementation(async (_url) => {
      return {
        login: 'blabla',
        public_repos: randomInt(10),
        followers: randomInt(14),
      };
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('searchUsers', () => {
    it('should be a list', async () => {
      expect(service.searchUsers('bla')).resolves.toBeInstanceOf(Array);
    });

    it('should be well formatted', async () => {
      const users = await service.searchUsers('blabla');
      for (let user of users) {
        expect(user.followers).toEqual(expect.any(Number));
        expect(user.repos).toEqual(expect.any(Number));
        expect(user.username).toEqual(expect.any(String));
      }
    });

    it('should be ordered by followers', async () => {
      const users = await service.searchUsers('blabla');
      for (let i = 0; i < users.length - 1; i++) {
        expect(users[i].followers).toBeGreaterThanOrEqual(
          users[i + 1].followers,
        );
      }
    });
  });
});
