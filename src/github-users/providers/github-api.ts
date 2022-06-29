import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

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
      const resp = this.httpService.get(`${this.API_URL}/search/users`, {
        params: {
          q: query,
          sort: 'repositories',
          per_page: 5,
        },
      });

      //use lastValueFrom because toPromise is deprecated
      // this approach works becase we are expecting only one production
      const { data } = await lastValueFrom(resp);
      return data.items;
    } catch (error) {
      return [];
    }
  }

  public async getFullUser(url: string): Promise<any> {
    try {
      const resp = this.httpService.get(url);
      const { data } = await lastValueFrom(resp);
      return data;
    } catch (error) {
      return null;
    }
  }
}
