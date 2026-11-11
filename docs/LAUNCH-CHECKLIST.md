# RA BIKER — launch verification (development branch)

## Built in code
- Responsive homepage with photo categories immediately after hero.
- Collection and product templates, cart, native Shopify checkout form.
- Product sorting and filter UI (requires Shopify Search & Discovery filters configured).
- Search results page, standard content page, 404 page, contact form page template.
- Optional merchant-uploaded pet video gallery (theme editor > Home page > Pet video showcase > Add block > Upload video; no empty gallery shown to shoppers).
- Navigation links use all-products fallback until Dogs/Cats collections exist.

## Shopify admin tasks — required before launch
- Confirm every referenced shop_images asset exists in Shopify Files and displays in preview.
- Create real Dogs and Cats collections; set menus and add real products with owned/licensed photos, correct prices, inventory, variants and shipping weights.
- Create Contact page and assign 'contact' template; create About page and publish it; configure shipping/refund/privacy/terms policies and real support contact details.
- Configure Shopify Payments or an eligible third-party gateway for the merchant's registered business and country; configure payouts, taxes, shipping zones/rates and domain.
- Upload authentic short videos in theme editor, attach products and verify playback on iOS and Android. Do not publish fictitious catalog items as purchasable products.
- Configure Shopify Search & Discovery filters and test each collection.

## Manual acceptance tests — not yet completed
1. Home page: all photos load; buttons lead to valid collections; video controls and links work.
2. iPhone Safari and Android Chrome: mobile menu opens/closes; no horizontal overflow; video plays inline.
3. Search: query returns correct products; empty results state; pagination.
4. Collection: sorting, filter apply/clear, product links, empty state, pagination.
5. Product: select variant, change quantity, add to cart; unavailable variants cannot be purchased.
6. Cart: change quantity, remove item using quantity 0, totals update, checkout navigates correctly.
7. Checkout: complete a Shopify test order with configured payment test mode; check tax/shipping/order email/refund workflow.
8. Contact: submit test message and confirm receipt; verify policies, footer and About pages.
9. Accessibility: keyboard navigation, focus states, image alt text, reduced-motion behavior.
10. Performance: measure real mobile preview and optimize image/video payloads.

Do not publish the theme or accept live payments until admin configuration and end-to-end tests pass.
