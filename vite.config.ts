import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, type Plugin} from 'vite';
import type {Connect} from 'vite';
import {handlePinnedReposRequest} from './src/utils/githubPinned';

function pinnedReposApiPlugin(): Plugin {
  const mount = (server: { middlewares: Connect.Server }) => {
    server.middlewares.use((req, res, next) => {
      const url = req.url ?? '';
      if (!url.startsWith('/api/pinned-repos')) {
        next();
        return;
      }

      void handlePinnedReposRequest(url).then(async (response) => {
        res.statusCode = response.status;
        response.headers.forEach((value, key) => {
          res.setHeader(key, value);
        });
        res.end(Buffer.from(await response.arrayBuffer()));
      }).catch(next);
    });
  };

  return {
    name: 'pinned-repos-api',
    configureServer: mount,
    configurePreviewServer: mount,
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), pinnedReposApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
