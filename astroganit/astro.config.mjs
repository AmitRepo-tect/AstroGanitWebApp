import { defineConfig } from 'astro/config';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    vite: {
        plugins: [
            viteStaticCopy({
                targets: [
                    {
                        src: 'public/_redirects', // From public/
                        dest: 'dist/'                // To dist/
                    }
                ]
            })
        ]
    }
});
