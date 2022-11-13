import { Client } from '@elastic/elasticsearch';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: Client,
    useFactory: async (config: ConfigService) => {
      return new Client({
        headers: {
          'Content-Type': 'application/json',
        },
        nodes: config.get<string>('ELASTICSEARCH__NODES')?.split(','),
        auth: {
          username: config.get<string>('ELASTICSEARCH__AUTH_USER') || '',
          password: config.get<string>('ELASTICSEARCH__AUTH_PASS') || '',
        },
      });
    },
    inject: [ConfigService],
  },
];
