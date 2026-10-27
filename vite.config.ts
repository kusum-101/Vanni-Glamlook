import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { isPreview, siteUrl } from './scripts/site-config.mjs';

export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };
  const url = siteUrl(env);
  const preview = isPreview(env);

  return {
    plugins: [
      react(),
      {
        name: 'site-url',
        transformIndexHtml: (html) => {
          const out = html.replaceAll('__SITE_URL__', url);
          return preview ? out.replace('<meta charset="UTF-8" />', '<meta charset="UTF-8" />\n    <meta name="robots" content="noindex, nofollow, noimageindex" />') : out;
        },
      },
    ],
    // Components are written against the React API; Preact's compat layer runs them at a fraction of the size.
    resolve: {
      alias: [
        { find: 'react-dom/client', replacement: 'preact/compat/client' },
        { find: 'react-dom/server', replacement: 'preact/compat/server' },
        { find: 'react-dom', replacement: 'preact/compat' },
        { find: 'react/jsx-runtime', replacement: 'preact/jsx-runtime' },
        { find: 'react/jsx-dev-runtime', replacement: 'preact/jsx-dev-runtime' },
        { find: /^react$/, replacement: 'preact/compat' },
      ],
    },
    ssr: { noExternal: true },
    // Builds write dist/ and a temporary dist-ssr/; watching them crashes the dev server on Windows (EBUSY).
    server: { watch: { ignored: ['**/dist/**', '**/dist-ssr/**'] } },
    build: {
      target: 'es2020',
      cssCodeSplit: false,
      assetsInlineLimit: 2048,
    },
  };
});
