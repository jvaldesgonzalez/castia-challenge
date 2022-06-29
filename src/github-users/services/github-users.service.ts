import { Injectable } from '@nestjs/common';
import { GithubUser } from '../models/github-user.model';
import { GithubApi } from '../providers/github-api';

@Injectable()
export class GithubUsersService {
  constructor(private readonly githubProvider: GithubApi) {}

  public async searchUsers(query: string): Promise<GithubUser[]> {
    const matched = await this.githubProvider.searchUsers(query);
    const users = await Promise.all(
      matched
        .map((ghUser) => ghUser.url)
        .map((url) => this.getFollowersAndRepos(url)),
    );
    users.sort((a, b) => (a.followers < b.followers ? 1 : -1));
    return users;
  }

  private async getFollowersAndRepos(userUrl: string): Promise<GithubUser> {
    const user = await this.githubProvider.getFullUser(userUrl);
    return user
      ? {
          username: user.login,
          repos: user.public_repos,
          followers: user.followers,
        }
      : {
          username: userUrl,
          repos: 0,
          followers: 0,
          error: "Couldn't fetch user",
        };
  }
}
