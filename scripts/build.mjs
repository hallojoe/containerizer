import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = new URL('../', import.meta.url);
const dest = new URL('dist/', root);
await rm(dest, { recursive: true, force: true });
await mkdir(new URL('vendor/', dest), { recursive: true });
await cp(new URL('src/', root), dest, { recursive: true });
await cp(new URL('examples/', root), new URL('examples/', dest), { recursive: true });
for (const file of ['three.module.js', 'three.core.js']) {
  await cp(new URL(`node_modules/three/build/${file}`, root), new URL(`vendor/${file}`, dest));
}
await cp(new URL('node_modules/three/examples/jsm/controls/OrbitControls.js', root), new URL('vendor/OrbitControls.js', dest));
await cp(new URL('node_modules/three/LICENSE', root), new URL('vendor/THREE-LICENSE.txt', dest));
console.log(`Built ${fileURLToPath(dest)}`);
