import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubApi {
  public API_URL: string;
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.API_URL =
      this.configService.get<string>('GITHUB_URL') || 'https://api.github.com';
  }

  public async searchUsers(query: string): Promise<any[]> {
    try {
      const { data } = await this.httpService
        .get(`${this.API_URL}/search/users`, {
          params: {
            q: query,
            sort: 'repositories',
            per_page: 5,
          },
        })
        .toPromise();
      return data.items;
    } catch (error) {
      return [];
    }
  }

  public async getFullUser(url: string): Promise<any> {
    try {
      const { data } = await this.httpService.get(url).toPromise();
      return data;
    } catch (error) {
      return null;
    }
  }
}
