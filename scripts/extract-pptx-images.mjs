#!/usr/bin/env node
/**
 * PPTX sunumundan görselleri çıkarır ve siteye hazırlar.
 *
 * Kullanım:
 *   node scripts/extract-pptx-images.mjs "/path/to/SUNUM - AYDİNOX.pptx"
 */
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const pptxPath = process.argv[2] ?? path.join(process.env.HOME ?? '', 'Downloads/SUNUM - AYDİNOX.pptx')
const rawDir = path.join(root, 'public/images/presentation/raw')
const curatedDir = path.join(root, 'public/images/presentation/curated')
const minBytes = 80 * 1024

if (!fs.existsSync(pptxPath)) {
  console.error('PPTX bulunamadı:', pptxPath)
  process.exit(1)
}

fs.mkdirSync(rawDir, { recursive: true })
fs.mkdirSync(curatedDir, { recursive: true })

execSync(`unzip -o -j ${JSON.stringify(pptxPath)} "ppt/media/*" -d ${JSON.stringify(rawDir)}`, { stdio: 'inherit' })

for (const file of fs.readdirSync(curatedDir)) {
  fs.unlinkSync(path.join(curatedDir, file))
}

const files = fs.readdirSync(rawDir)
  .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
  .filter(f => fs.statSync(path.join(rawDir, f)).size >= minBytes)
  .sort((a, b) => {
    const na = Number.parseInt(a.match(/(\d+)/)?.[1] ?? '0', 10)
    const nb = Number.parseInt(b.match(/(\d+)/)?.[1] ?? '0', 10)
    return na - nb
  })

files.forEach((file, index) => {
  const ext = path.extname(file).slice(1).toLowerCase()
  const target = `aydinox-${String(index + 1).padStart(3, '0')}.${ext}`
  fs.copyFileSync(path.join(rawDir, file), path.join(curatedDir, target))
})

const manifest = {
  count: files.length,
  extractedAt: new Date().toISOString(),
  source: path.basename(pptxPath),
  images: fs.readdirSync(curatedDir)
    .sort()
    .map((file, i) => ({
      id: i + 1,
      file,
      src: `/images/presentation/curated/${file}`,
      size: fs.statSync(path.join(curatedDir, file)).size
    }))
}

fs.writeFileSync(
  path.join(root, 'public/images/presentation/manifest.json'),
  JSON.stringify(manifest, null, 2)
)

console.log(`✓ ${manifest.count} görsel curated/ klasörüne kopyalandı`)
console.log(`✓ manifest.json güncellendi`)

execSync('node scripts/build-image-catalog.mjs', { cwd: root, stdio: 'inherit' })
