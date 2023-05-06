import { promises as fs } from 'fs'
import getTheme from './theme'

fs.mkdir('./themes', { recursive: true })
  .then(() => Promise.all([
    fs.writeFile(
      './themes/leaf-dark.json',
      `${JSON.stringify(getTheme({
        style: 'dark',
        name: 'Leaf Dark',
      }), null, 2)}\n`,
    ),
    fs.writeFile(
      './themes/leaf-black.json',
      `${JSON.stringify(getTheme({
        style: 'dark',
        name: 'Leaf Black',
        black: true,
      }), null, 2)}\n`,
    ),
    fs.writeFile(
      './themes/leaf-dark-soft.json',
      `${JSON.stringify(getTheme({
        style: 'dark',
        name: 'Leaf Dark Soft',
        soft: true,
      }), null, 2)}\n`,
    ),
  ]))
  .catch(() => process.exit(1))
