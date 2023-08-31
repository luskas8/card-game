import path from 'path'
import { fileURLToPath } from 'url'

function __dirname(url) {
    const __filename = fileURLToPath(url)
    const __dirname = path.dirname(__filename)
    return __dirname
}
export default __dirname