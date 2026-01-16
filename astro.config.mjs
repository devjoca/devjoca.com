import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import { visit } from "unist-util-visit";
import sitemap from "@astrojs/sitemap";
import compress from "@playform/compress";

// https://astro.build/config
export default defineConfig({
  site: "https://devjoca.com/",
  image: {
    // Enable built-in image optimization
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    react(),
    sitemap(),
    compress(), // Compression must be last
  ],
  build: {
    inlineStylesheets: "auto", // Inline small CSS
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom"], // Split React into separate chunk
          },
        },
      },
    },
  },
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
      function remarkImageOptimization() {
        return tree => {
          visit(tree, "image", node => {
            // Add loading="lazy" to image nodes
            if (!node.data) node.data = {};
            if (!node.data.hProperties) node.data.hProperties = {};
            node.data.hProperties.loading = "lazy";
          });
        };
      },
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
});
