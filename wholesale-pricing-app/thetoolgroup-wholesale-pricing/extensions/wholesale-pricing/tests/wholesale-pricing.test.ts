import {describe, expect, test} from 'vitest';
import {DiscountClass, type CartInput} from '../generated/api';
import {cartLinesDiscountsGenerateRun} from '../src/cart_lines_discounts_generate_run';

const emptyPrices = {
  wholesale: null,
  wholesaleTk: null,
  wholesaleNo: null,
  wholesalePr: null,
  wholesaleGp: null,
  wholesaleBl: null,
  wholesaleBu: null,
  wholesaleTt: null,
};

function input({
  tags = ['Wholesale'],
  retailPrice = '15.06',
  productPrices = {wholesale: {value: '9.04'}},
}: {
  tags?: string[];
  retailPrice?: string;
  productPrices?: Partial<typeof emptyPrices>;
} = {}): CartInput {
  return {
    cart: {
      buyerIdentity: {
        customer: {
          wholesaleTags: [
            'WholesaleTK',
            'WholesaleNO',
            'WholesalePR',
            'WholesaleGP',
            'WholesaleBL',
            'WholesaleBU',
            'WholesaleTT',
            'Wholesale',
          ].map((tag) => ({tag, hasTag: tags.includes(tag)})),
        },
      },
      lines: [
        {
          id: 'gid://shopify/CartLine/1',
          cost: {amountPerQuantity: {amount: retailPrice}},
          merchandise: {
            __typename: 'ProductVariant',
            product: {...emptyPrices, ...productPrices},
          },
        },
      ],
    },
    discount: {discountClasses: [DiscountClass.Product]},
  };
}

function fixedAmount(result: ReturnType<typeof cartLinesDiscountsGenerateRun>) {
  const operation = result.operations[0];
  if (!operation || !('productDiscountsAdd' in operation)) return null;
  return operation.productDiscountsAdd.candidates[0]?.value.fixedAmount?.amount;
}

describe('wholesale pricing discount', () => {
  test('does not discount a retail customer', () => {
    expect(cartLinesDiscountsGenerateRun(input({tags: []}))).toEqual({operations: []});
  });

  test('reduces $15.06 to the generic product wholesale price of $9.04', () => {
    expect(fixedAmount(cartLinesDiscountsGenerateRun(input()))).toBe(6.02);
  });

  test('uses the matching specialist price group by priority', () => {
    const result = cartLinesDiscountsGenerateRun(
      input({
        tags: ['WholesaleTK', 'Wholesale'],
        productPrices: {
          wholesaleTk: {value: '8.00'},
          wholesale: {value: '9.04'},
        },
      }),
    );

    expect(fixedAmount(result)).toBe(7.06);
  });

  test('does not discount missing, invalid, or higher wholesale prices', () => {
    const missing = input({productPrices: {}});
    const invalid = input({productPrices: {wholesale: {value: 'invalid'}}});
    const higher = input({productPrices: {wholesale: {value: '20.00'}}});

    expect(cartLinesDiscountsGenerateRun(missing)).toEqual({operations: []});
    expect(cartLinesDiscountsGenerateRun(invalid)).toEqual({operations: []});
    expect(cartLinesDiscountsGenerateRun(higher)).toEqual({operations: []});
  });

  test('requires the PRODUCT discount class', () => {
    const noProductClass = input();
    noProductClass.discount.discountClasses = [];

    expect(cartLinesDiscountsGenerateRun(noProductClass)).toEqual({operations: []});
  });
});
