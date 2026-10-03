"use client";

/**
 * Sanity Studio for Galyna — opens at /studio (on the phone too).
 * Content types live in src/sanity/schemaTypes, the left menu in src/sanity/structure.ts.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { ukUALocale } from "@sanity/locale-uk-ua";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";

const SINGLETONS = new Set(["support"]);
const SINGLETON_ACTIONS = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "home-made-galyna",
  title: "Home Made Galyna",
  basePath: "/studio",
  projectId: projectId || "not-configured",
  dataset,
  plugins: [
    structureTool({ structure }),
    ukUALocale(), // Studio interface in Ukrainian
    ...(process.env.NODE_ENV === "development" ? [visionTool({ defaultApiVersion: apiVersion })] : []),
  ],
  schema: {
    types: schemaTypes,
    // «Підтримка» exists once — no "create new" / delete / duplicate for it
    templates: (prev) => prev.filter((t) => !SINGLETONS.has(t.schemaType)),
  },
  document: {
    actions: (prev, ctx) =>
      SINGLETONS.has(ctx.schemaType) ? prev.filter(({ action }) => action && SINGLETON_ACTIONS.has(action)) : prev,
  },
});
