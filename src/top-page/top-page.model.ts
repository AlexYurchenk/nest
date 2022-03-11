/* eslint-disable @typescript-eslint/no-empty-interface */
import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
export interface TopPageModel extends Base {}
export enum TopLevelCategory {
  Books,
  Products,
  Courses,
  Services,
}
class TopPageHh {
  @prop()
  count: number;
  @prop()
  juniorSalary: number;
  @prop()
  middleSalary: number;
  @prop()
  seniorSalary: number;
}
class TopPageAdvantage {
  @prop()
  title: string;
  @prop()
  description: string;
}
export class TopPageModel extends TimeStamps {
  @prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory;
  @prop()
  secondCategory: string;
  @prop()
  alias: string;
  @prop()
  title: string;
  @prop()
  category: string;
  @prop()
  hh?: TopPageHh;
  @prop({ type: () => [TopPageAdvantage] })
  advantages: TopPageAdvantage[];
  @prop()
  seoText: string;
  @prop()
  tagsTitle: string;
  @prop({ type: () => [String] })
  tags: string[];
}
