import { ConfigService } from '@nestjs/config';
import { ITelegramOptions } from 'src/telegram/telegram.interface';

export const getTelegramConfig = async (
  configService: ConfigService,
): Promise<ITelegramOptions> => {
  return {
    chatId: configService.get('TELEGRAM_ID'),
    token: configService.get('TELEGRAM_TOKEN'),
  };
};
