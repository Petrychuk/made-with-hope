export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-07-01";

/** Without a project id the site runs on the demo content from src/content. */
export const sanityEnabled = Boolean(projectId);
