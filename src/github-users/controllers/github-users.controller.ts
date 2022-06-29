import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { GithubUsersService } from '../services/github-users.service';

@Controller('github-users')
@ApiTags('github-users')
export class GithubUsersController {
  constructor(private readonly githubService: GithubUsersService) {}

  @Get('search')
  @ApiQuery({ name: 'q', type: String })
  public async searchUsers(@Query('q') q: string) {
    return await this.githubService.searchUsers(q);
  }
}
