import { defineConfig } from 'vite';

const fullReloadAlways = {
  name: 'full-reload-always',
  handleHotUpdate({ server }) {
    server.ws.send({ type: 'full-reload' });
    return [];
  },
};

export default defineConfig(({ command }) => {
  if (command === 'build') {
    return {
      root: 'src',
      build: {
        outDir: '../dist',
        rollupOptions: {
          input: 'src/main.js',
          output: {
            entryFileNames: '[name].js',
            chunkFileNames: '[name].js',
          },
        },
        emptyOutDir: true,
        sourcemap: true,
      },
    };
  }

  if (command === 'serve') {
    return {
      plugins: [fullReloadAlways],
    };
  }
});
