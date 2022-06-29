import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GithubUsersController } from './controllers/github-users.controller';
import { GithubApi } from './providers/github-api';
import { GithubUsersService } from './services/github-users.service';

@Module({
  imports: [HttpModule],
  providers: [GithubUsersService, GithubApi],
  controllers: [GithubUsersController],
})
export class GithubUsersModule {}
