/* eslint-disable @typescript-eslint/no-empty-interface */
import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
export interface ProductModel extends Base {}

class ProductCharacteristic {
  name: string;
  value: string;
}

export class ProductModel extends TimeStamps {
  @prop()
  image: string;
  @prop()
  title: string;
  @prop()
  price: number;
  @prop()
  oldPrice: number;
  @prop()
  credit: number;
  @prop()
  calculatedRating: number;
  @prop()
  description: string;
  @prop()
  advantages: string;
  @prop()
  disadvantages: string;
  @prop({ type: () => [String] })
  categories: string[];
  @prop({ type: () => [String] })
  tags: string[];
  @prop({ type: () => [ProductCharacteristic], _id: false })
  characteristic: ProductCharacteristic[];
}
