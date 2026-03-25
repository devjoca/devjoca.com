import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import { visit } from "unist-util-visit";
import sitemap from "@astrojs/sitemap";
import compress from "@playform/compress";
import mermaid from "astro-mermaid";

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
    mermaid({
      autoTheme: true,
      theme: "neutral",
      themeVariables: {
        primaryColor: "#006cac",
        primaryTextColor: "#282728",
        primaryBorderColor: "#006cac",
        lineColor: "#282728",
        secondaryColor: "#1ad9d9",
        tertiaryColor: "#f5fefb",
      },
    }),
    react(),
    mdx(),
    sitemap(),
    compress(), // Compression must be last
  ],
  build: {
    inlineStylesheets: "auto", // Inline small CSS
  },
  vite: {
    plugins: [tailwindcss()],
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
