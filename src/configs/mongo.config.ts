import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<TypegooseModuleOptions> => {
  return {
    uri:
      'mongodb+srv://' +
      configService.get('DATABASE_USER') +
      ':' +
      configService.get('DATABASE_PASSWORD') +
      '@shop.obphg.mongodb.net/test?authSource=admin&replicaSet=atlas-6yhzu7-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
  };
};
