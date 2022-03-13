class ProductCharacteristic {
  name: string;
  value: string;
}

export class CreatedProductDto {
  image: string;
  title: string;
  price: number;
  oldPrice?: number;
  credit: number;
  calculatedRating: number;
  description: string;
  advantages: string;
  disadvantages: string;
  categories: string[];
  tags: string[];
  characteristic: ProductCharacteristic[];
}
