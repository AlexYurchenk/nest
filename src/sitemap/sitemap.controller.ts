import { ConfigService } from '@nestjs/config';
import { TopPageService } from './../top-page/top-page.service';
import { Controller, Get, Header } from '@nestjs/common';
import { format, subDays } from 'date-fns';
import { Builder } from 'xml2js';
import { CATEGORY_URL } from './sitemap.constants';
import { getTopLevelXml } from './sitemap.helpers';
@Controller('sitemap')
export class SitemapController {
  domain: string;
  constructor(
    private readonly topPageService: TopPageService,
    private readonly configService: ConfigService,
  ) {
    this.domain = this.configService.get('DOMAIN') ?? '';
  }
  @Get('xml')
  @Header('content-type', 'text/xml')
  async sitemap() {
    const formatString = "yyyy-MM-dd'T'HH:mm:00:000xx";
    let res = [
      {
        loc: `${this.domain}`,
        lastmod: format(subDays(new Date(), 1), formatString),
        changefreq: 'daily',
        priority: '1.0',
      },
      ...getTopLevelXml(CATEGORY_URL, this.domain, formatString),
    ];
    const builder = new Builder({
      xmldec: { version: '1.0', encoding: 'UTF-8' },
    });
    const pages = await this.topPageService.findAll();
    res = res.concat(
      pages.map((page) => ({
        loc: `${this.domain}${CATEGORY_URL[page.firstCategory]}`,
        lastmod: format(new Date(page.updatedAt ?? new Date()), formatString),
        changefreq: 'weekly',
        priority: '0.7',
      })),
    );
    return builder.buildObject({
      urlset: {
        $: { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.0' },
        url: res,
      },
    });
  }
}