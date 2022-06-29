import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { GithubUsersService } from '../services/github-users.service';

@Controller('github-users')
@ApiTags('github-users')
export class GithubUsersController {
  constructor(private readonly githubService: GithubUsersService) {}

  @Get('search')
  @ApiQuery({ name: 'q', type: String })
  public async searchUsers(@Query('q') q: string) {
    const users = await this.githubService.searchUsers(q);
    if (users.length === 0) {
      throw new NotFoundException(`There is no users matching with ${q}`);
    }
    return users;
  }
}
