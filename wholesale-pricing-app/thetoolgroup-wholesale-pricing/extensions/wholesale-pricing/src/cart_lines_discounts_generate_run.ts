import {
  DiscountClass,
  ProductDiscountSelectionStrategy,
  CartInput,
  CartLinesDiscountsGenerateRunResult,
} from '../generated/api';

type WholesaleGroup = 'tk' | 'no' | 'pr' | 'gp' | 'bl' | 'bu' | 'tt' | 'generic';
type WholesaleField =
  | 'wholesaleTk'
  | 'wholesaleNo'
  | 'wholesalePr'
  | 'wholesaleGp'
  | 'wholesaleBl'
  | 'wholesaleBu'
  | 'wholesaleTt'
  | 'wholesale';

const GROUP_PRIORITY: ReadonlyArray<readonly [string, WholesaleGroup]> = [
  ['wholesaletk', 'tk'],
  ['wholesaleno', 'no'],
  ['wholesalepr', 'pr'],
  ['wholesalegp', 'gp'],
  ['wholesalebl', 'bl'],
  ['wholesalebu', 'bu'],
  ['wholesalett', 'tt'],
  ['wholesale', 'generic'],
];

const PRICE_FIELD: Record<WholesaleGroup, WholesaleField> = {
  tk: 'wholesaleTk',
  no: 'wholesaleNo',
  pr: 'wholesalePr',
  gp: 'wholesaleGp',
  bl: 'wholesaleBl',
  bu: 'wholesaleBu',
  tt: 'wholesaleTt',
  generic: 'wholesale',
};

function getWholesaleGroup(input: CartInput): WholesaleGroup | null {
  const tags = input.cart.buyerIdentity?.customer?.wholesaleTags ?? [];

  for (const [expectedTag, group] of GROUP_PRIORITY) {
    const matched = tags.some(
      ({tag, hasTag}) => hasTag && tag.toLowerCase() === expectedTag,
    );
    if (matched) return group;
  }

  return null;
}

function parsePrice(metafield: {value: string} | null | undefined): number | null {
  if (!metafield) return null;

  const price = Number(metafield.value);
  return Number.isFinite(price) && price > 0 ? price : null;
}

export function cartLinesDiscountsGenerateRun(
  input: CartInput,
): CartLinesDiscountsGenerateRunResult {
  if (!input.discount.discountClasses.includes(DiscountClass.Product)) {
    return {operations: []};
  }

  const group = getWholesaleGroup(input);
  if (!group) {
    return {operations: []};
  }

  const field = PRICE_FIELD[group];
  const candidates = input.cart.lines.flatMap((line) => {
    if (line.merchandise.__typename !== 'ProductVariant') return [];

    const wholesalePrice = parsePrice(line.merchandise.product[field]);
    if (wholesalePrice === null) return [];

    const retailPrice = Number(line.cost.amountPerQuantity.amount);
    if (!Number.isFinite(retailPrice)) return [];

    const discountInCents =
      Math.round(retailPrice * 100) - Math.round(wholesalePrice * 100);
    if (discountInCents <= 0) return [];

    return [
      {
        message: 'Wholesale price',
        targets: [{cartLine: {id: line.id}}],
        value: {
          fixedAmount: {
            amount: discountInCents / 100,
            appliesToEachItem: true,
          },
        },
      },
    ];
  });

  if (!candidates.length) return {operations: []};

  return {
    operations: [
      {
        productDiscountsAdd: {
          candidates,
          selectionStrategy: ProductDiscountSelectionStrategy.All,
        },
      },
    ],
  };
}
