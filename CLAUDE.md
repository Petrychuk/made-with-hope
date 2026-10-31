# CLAUDE.md — Galyna's World

## 1. Project Overview

**Project:** Galyna's World (formerly Home Made Galyna)

A personal handmade marketplace and creative website for Galyna Herasymenko.

### Main priorities

1. **Handmade products and sales** — the primary business goal.
2. Galyna's personal story and handmade craftsmanship.
3. Poetry, diary entries and creative writing.
4. Transparent charitable support for her son Illia's treatment.

The homepage must prioritise handmade products and encourage visitors to explore and purchase them.

Use authentic Ukrainian content, real photographs and a warm, trustworthy visual style.

Do not replace real content with invented stories, products, testimonials or medical information.

## 2. Development Principles

- Follow existing project architecture and coding conventions.
- Inspect relevant files before making changes.
- Prefer simple, maintainable and reusable solutions.
- Avoid unnecessary dependencies and abstractions.
- Preserve existing functionality unless explicitly requested otherwise.
- Do not introduce unrelated changes.

### Minimal Patch Policy — Mandatory

**Every patch must contain only the necessary differences.**

- Modify only the relevant files and code sections.
- Never rewrite entire files when a targeted edit is sufficient.
- Do not regenerate or restructure the whole project.
- Preserve existing formatting and naming conventions.
- Do not refactor unrelated components.
- Keep patches small, focused and easy to review.
- Short, meaningful code comments are allowed.
- Avoid obvious, repetitive or lengthy comments.
- Do not create unnecessary documentation files.

For every completed change, briefly report:
- Files changed.
- What was changed.
- Tests or checks performed.
- Any remaining issues.

## 3. Responsive Design — Mandatory

Use a mobile-first approach.

Ensure layouts work correctly across:
- Mobile: 320–767px.
- Tablet: 768–1023px.
- Desktop: 1024px and above.

Requirements:
- No horizontal overflow.
- Responsive typography and spacing.
- Flexible grids and images.
- Accessible navigation and touch controls.
- Touch targets should generally be at least 44 × 44px.
- Preserve image aspect ratios.
- Use appropriate image cropping without cutting off important subjects or handmade products.
- Test product cards, navigation, galleries, forms and footer at different screen widths.

Do not change desktop layouts unnecessarily when fixing mobile issues.

## 4. SEO Best Practices — Mandatory

Apply SEO best practices to every public page.

### Technical SEO

- Use unique, descriptive page titles and meta descriptions.
- Use semantic HTML5.
- Maintain logical heading hierarchy with one main H1 per page.
- Use meaningful image alt text.
- Add canonical URLs where appropriate.
- Ensure clean, readable URLs.
- Maintain sitemap.xml and robots.txt as appropriate.
- Prevent indexing of private, draft or administrative pages.
- Avoid duplicate content.
- Use Open Graph metadata for social sharing.
- Use appropriate structured data (JSON-LD) where supported.

### Product SEO

For product detail pages:
- Descriptive product names.
- Unique product descriptions.
- Optimised product images.
- Product structured data using real CMS values.
- Correct availability and pricing information when provided.
- No invented prices, reviews or ratings.

### Performance

Follow Core Web Vitals best practices:
- Optimise LCP, CLS and INP.
- Use responsive images and appropriate image formats.
- Lazy-load below-the-fold media.
- Prioritise important above-the-fold images.
- Avoid unnecessary JavaScript.
- Prevent layout shifts.

Do not sacrifice image quality or visual presentation for minor performance gains.

## 5. Sanity CMS Integration

Sanity CMS is the content management system.

**The CMS must remain the source of truth for managed content.**

### Rules

- Do not hardcode content that should be managed through Sanity.
- Reuse existing Sanity schemas, queries and utilities.
- Check current schema definitions before changing data structures.
- Keep frontend components compatible with existing CMS documents.
- Handle missing images, optional fields and empty collections gracefully.
- Respect draft and published content states.
- Never expose private Sanity API tokens in client-side code.
- Do not replace CMS content with demo or placeholder products in production.

### Adding content

When adding a product, poem, diary entry or other CMS-managed content:

1. Check whether the relevant Sanity schema already exists.
2. Reuse the existing schema and content model.
3. Add or update the content through Sanity Studio.
4. Verify the content appears correctly on the website.
5. Check mobile layout, images, metadata and links.

Do not create a new schema if an existing one supports the content.

### Editing content

For text, photos, prices, descriptions and availability:

- Prefer editing the existing document in Sanity Studio.
- Do not modify frontend code for ordinary content updates.
- Preserve document IDs and references when possible.
- Verify that updated content is displayed correctly.

### Removing content

For sold or unavailable handmade products:

- Prefer marking products as sold or unavailable when the schema supports it.
- Preserve product pages when useful for SEO and product history.
- Allow products to be hidden from active catalogues when appropriate.
- Delete CMS documents only when explicitly requested.
- Check for broken links or references after removal.

For poems, diary entries and other content, use existing draft, publish, unpublish or delete functionality.

### CMS Changes

If schema changes are necessary:

- Explain why the existing schema is insufficient.
- Make backward-compatible changes whenever possible.
- Preserve existing CMS data.
- Update only affected queries, types and components.
- Never reset, overwrite or delete production CMS data without explicit approval.

## 6. Accessibility and UX

- Follow WCAG 2.2 AA principles where practical.
- Maintain sufficient text contrast.
- Ensure keyboard navigation.
- Use visible focus indicators.
- Associate form labels with inputs.
- Provide accessible error messages.
- Use meaningful button and link labels.
- Avoid unnecessary animations.
- Respect reduced-motion preferences.

The website should feel personal, clear and easy to use, especially for non-technical visitors.

## 7. Visual Design and Content

- Preserve the existing design system, colours and typography.
- Use consistent buttons, spacing, cards and border radii.
- Prioritise authentic photographs of Galyna and her handmade creations.
- Avoid generic stock imagery unless requested.
- Keep Ukrainian copy natural, respectful and emotionally authentic.
- Do not exaggerate charitable claims or medical circumstances.
- Make product discovery and purchase actions clear.

## 8. Testing and Quality Control

After each change:

1. Check affected components and routes.
2. Run relevant lint, type checks and tests available in the project.
3. Verify mobile, tablet and desktop layouts when UI changes.
4. Check for broken images and links.
5. Check browser console errors.
6. Verify CMS queries and content rendering when affected.
7. Check SEO metadata when modifying public pages.

Do not claim tests passed unless they were actually executed.

## 9. Git and Deployment Safety

- Work on the current branch unless instructed otherwise.
- Do not create branches unnecessarily.
- Do not commit, push, merge or deploy without explicit approval.
- Never modify production environment variables without permission.
- Never expose credentials or API tokens.
- Do not run destructive database or CMS operations without approval.

## 10. Communication

Keep responses concise and practical.

- Explain important technical decisions briefly.
- Prefer implementation over lengthy theoretical explanations.
- Ask questions only when a missing detail blocks safe implementation.
- Avoid repeating unchanged code.
- When proposing a patch, show only the changed sections or a unified diff.
- Use short comments in code only when necessary.

## 11. Multilingual Support — Mandatory

The website supports two languages:

- **Ukrainian (`uk`)** — primary and default language.
- **English (`en`)** — secondary language.

### General Rules

- All public-facing UI must support both languages.
- Never mix Ukrainian and English within the same language version, except for proper names and intentional quotations.
- Do not hardcode visible UI text directly in components.
- Reuse the existing internationalisation (i18n) architecture.
- Do not introduce another translation library unless necessary.
- Preserve the selected language during navigation.
- The language switcher must work correctly on mobile, tablet and desktop.

### Sanity CMS Localisation

- CMS-managed content must support Ukrainian and English.
- Reuse the existing localisation approach and schemas.
- Products, descriptions, poems, diary entries and SEO metadata should support both languages.
- Do not overwrite Ukrainian content when editing English translations.
- If a translation is missing, use the project's established fallback strategy.
- Do not automatically publish machine-translated content without review.

### Multilingual SEO

- Use language-specific page titles and meta descriptions.
- Implement correct `hreflang` tags for `uk` and `en`.
- Configure `x-default` appropriately.
- Each language version must have a valid canonical URL.
- Include both language versions in the sitemap where applicable.
- Set the correct HTML `lang` attribute.
- Preserve language-specific URLs and avoid duplicate content.

### Content Management

Galyna must be able to:

1. Create and edit Ukrainian content in Sanity Studio.
2. Add or edit English translations independently.
3. Update product information in both languages.
4. Publish content using the existing localisation workflow.
5. Manage translations without modifying frontend code.

### Quality Checks

After modifying content or UI:

- Verify both Ukrainian and English versions.
- Check translated navigation, buttons, forms and error messages.
- Check responsive layouts with longer English text.
- Verify language switching and SEO metadata.
- Ensure no missing translation keys appear on public pages.

**Important:** Ukrainian is the primary language. English is an additional fully supported language, not a separate website.

**Core principle: Make the smallest safe change that solves the problem while preserving design, SEO, responsiveness and CMS functionality.**