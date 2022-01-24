import { ConfigService } from '@nestjs/config';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getMongoConfig = async (configService: ConfigService) => {
  return {
    uri: getMongoString(configService),
    ...getMongoOptions(),
  };
};

const getMongoString = (configService: ConfigService) => configService.get('DB_URL');

const getMongoOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
