import {useEffect, useState} from 'preact/hooks';

const DISCOUNT_TITLE = 'Wholesale pricing (FGC)';
const FUNCTION_HANDLE = 'wholesale-pricing';

const FIND_DISCOUNT_QUERY = `#graphql
  query FindWholesaleDiscount {
    discountNodes(first: 50) {
      nodes {
        id
        discount {
          __typename
          ... on DiscountAutomaticApp {
            title
            status
            appDiscountType {
              functionId
            }
          }
        }
      }
    }
  }
`;

const CREATE_DISCOUNT_MUTATION = `#graphql
  mutation CreateWholesaleDiscount($startsAt: DateTime!) {
    discountAutomaticAppCreate(
      automaticAppDiscount: {
        title: "Wholesale pricing (FGC)"
        functionHandle: "wholesale-pricing"
        discountClasses: [PRODUCT]
        startsAt: $startsAt
        combinesWith: {
          orderDiscounts: false
          productDiscounts: false
          shippingDiscounts: false
        }
      }
    ) {
      automaticAppDiscount {
        discountId
        status
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export default function HomePage() {
  const [state, setState] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    refreshStatus();
  }, []);

  async function refreshStatus() {
    setState('loading');
    setError('');

    try {
      const data = await adminGraphql(FIND_DISCOUNT_QUERY);
      const discount = data.discountNodes.nodes.find((node) => {
        const item = node.discount;
        return (
          item.__typename === 'DiscountAutomaticApp' &&
          item.title === DISCOUNT_TITLE
        );
      });

      setState(discount?.discount?.status === 'ACTIVE' ? 'active' : 'inactive');
    } catch (err) {
      setError(errorMessage(err));
      setState('error');
    }
  }

  async function activateWholesalePricing() {
    setState('activating');
    setError('');

    try {
      const data = await adminGraphql(CREATE_DISCOUNT_MUTATION, {
        startsAt: new Date().toISOString(),
      });
      const result = data.discountAutomaticAppCreate;

      if (result.userErrors.length > 0) {
        throw new Error(result.userErrors.map(({message}) => message).join(' '));
      }

      setState(result.automaticAppDiscount?.status === 'ACTIVE' ? 'active' : 'inactive');
      shopify.toast.show('Wholesale pricing activated');
    } catch (err) {
      setError(errorMessage(err));
      setState('error');
    }
  }

  const isActive = state === 'active';
  const isBusy = state === 'loading' || state === 'activating';

  return (
    <s-page heading="Wholesale pricing">
      <s-section heading="Automatic wholesale discount">
        <s-stack gap="base">
          <s-stack direction="inline" gap="small" alignItems="center">
            <s-text>Status:</s-text>
            <s-badge tone={isActive ? 'success' : 'warning'}>
              {isActive ? 'Active' : isBusy ? 'Checking' : 'Not active'}
            </s-badge>
          </s-stack>

          <s-paragraph>
            Applies product wholesale metafield prices automatically for eligible
            logged-in wholesale customers at cart and checkout.
          </s-paragraph>

          {error && <s-banner tone="critical">{error}</s-banner>}

          {!isActive && (
            <s-button
              variant="primary"
              onClick={activateWholesalePricing}
              loading={state === 'activating'}
              disabled={isBusy}
            >
              Activate wholesale pricing
            </s-button>
          )}

          {isActive && (
            <s-button href="shopify:admin/discounts" variant="secondary">
              View discount
            </s-button>
          )}
        </s-stack>
      </s-section>
    </s-page>
  );
}

async function adminGraphql(query, variables = {}) {
  const response = await fetch('shopify:admin/api/graphql.json', {
    method: 'POST',
    body: JSON.stringify({query, variables}),
  });
  const payload = await response.json();

  if (!response.ok || payload.errors?.length) {
    throw new Error(
      payload.errors?.map(({message}) => message).join(' ') ||
        `Shopify API request failed (${response.status})`,
    );
  }

  return payload.data;
}

function errorMessage(error) {
  return error instanceof Error ? error.message : 'Unable to activate wholesale pricing.';
}
