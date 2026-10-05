// GROQ queries. Images come with url + size + tiny blurred preview (lqip).
const image = `{ "url": asset->url, alt, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, "lqip": asset->metadata.lqip }`;

const productFields = `
  "slug": slug.current, name, description, price, status, featured,
  "images": images[0...5]${image}
`;

export const productsQuery = `*[_type == "product" && defined(slug.current)] | order(_createdAt desc){${productFields}}`;
export const productQuery = `*[_type == "product" && slug.current == $slug][0]{${productFields}}`;

const postFields = `
  "slug": slug.current, category, date, title, excerpt, body,
  "image": image${image}
`;
export const postsQuery = `*[_type == "post" && defined(slug.current)] | order(date desc, _createdAt desc){${postFields}}`;
export const postQuery = `*[_type == "post" && slug.current == $slug][0]{${postFields}}`;

export const updatesQuery = `*[_type == "update"] | order(date desc)[0...6]{ "id": _id, date, title, "image": image${image} }`;

export const supportQuery = `*[_type == "support" && _id == "support"][0]{ raised, goal, updated, monobankUrl }`;

export const transparencyQuery = `*[_type == "transparencyDoc"] | order(date desc){
  "id": _id, kind, title, date, "hasFile": defined(coalesce(file.asset, image.asset))
}`;

export const homeQuery = `*[_type == "homePage" && _id == "homePage"][0]{
  heroSubtitle, heroDescription, heroNote, "heroImage": heroImage${image},
  storyText, "storyImage": storyImage${image}, "polaroidImage": polaroidImage${image}, polaroidCaption,
  "kindImage": kindImage${image}, kindNote, messages[]{ text, author },
  faq[]{ question, answer }, quote,
  "craftImage": craftImage${image}, "supportImage": supportImage${image},
  telegramUrl, instagramUrl, facebookUrl, email
}`;
