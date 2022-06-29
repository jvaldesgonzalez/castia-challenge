import { HttpModule } from '@nestjs/axios';
import { NotFoundException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { GithubApi } from '../providers/github-api';
import { GithubUsersService } from '../services/github-users.service';
import { GithubUsersController } from './github-users.controller';

describe('GithubUsersController', () => {
  let controller: GithubUsersController;
  let service: GithubUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      controllers: [GithubUsersController],
      providers: [GithubUsersService, GithubApi],
    }).compile();

    controller = module.get<GithubUsersController>(GithubUsersController);
    service = module.get<GithubUsersService>(GithubUsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('searchUsers', () => {
    it('should throw 404 on empty list', async () => {
      const emptyResponse = [];
      jest
        .spyOn(service, 'searchUsers')
        .mockImplementation(async () => emptyResponse);

      expect(controller.searchUsers('blabla')).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
