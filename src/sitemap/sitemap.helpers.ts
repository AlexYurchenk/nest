import { format, subDays } from 'date-fns';
import { routeMapType } from './sitemap.constants';

export function getTopLevelXml(
  topLevelCategories: routeMapType,
  domain: string,
  formatString: string,
) {
  const TopLevelCategoriesArrey = Object.values(topLevelCategories);

  return TopLevelCategoriesArrey.map((e) => ({
    loc: `${domain}${e}`,
    lastmod: format(subDays(new Date(), 1), formatString),
    changefreq: 'daily',
    priority: '1.0',
  }));
}
