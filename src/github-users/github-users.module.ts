import { Module } from '@nestjs/common';
import { GithubUsersService } from './github-users.service';
import { GithubUsersController } from './github-users.controller';
import { GithubApi } from './github-api';

@Module({
  providers: [GithubUsersService, GithubApi],
  controllers: [GithubUsersController]
})
export class GithubUsersModule {}
