// import { dirname } from 'path';
// export default dirname(process.mainModule.filename);

import path  from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default __dirname;