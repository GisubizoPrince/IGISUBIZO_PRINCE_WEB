require('dotenv').config()

const bcrypt = require('bcrypt')
const cors = require('cors')
const express = require('express')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const mysql = require('mysql2/promise')

const app = express()
const port = Number(process.env.PORT || 3001)
const jwtSecret = process.env.JWT_SECRET
const initialAdminUsername = process.env.ADMIN_USERNAME
const initialAdminPasswordHash = process.env.ADMIN_PASSWORD_HASH

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ruhango_property_connect',
  timezone: 'Z',
  waitForConnections: true,
  connectionLimit: 10,
  dateStrings: true,
})

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json({ limit: '32kb' }))

const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 3 },
  fileFilter(req, file, callback) {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
      const error = new Error('Choose a JPEG, PNG, or WebP image.')
      error.status = 415
      return callback(error)
    }
    return callback(null, true)
  },
})

const seedProperties = [
  {
    title: 'Inzu igezweho i Ruhango',
    titleEn: 'Modern family home in Ruhango',
    location: 'Ruhango, Amajyepfo',
    price: 850000,
    period: 'month',
    kind: 'house',
    deal: 'rent',
    bedrooms: 4,
    bathrooms: 3,
    area: 240,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Inzu igezweho ifite ubusitani',
    badge: 'Gukodesha',
  },
  {
    title: 'Ikibanza kiri ahantu heza i Muhanga',
    titleEn: 'Residential plot in a great location in Muhanga',
    location: 'Muhanga, Amajyepfo',
    price: 42000000,
    period: null,
    kind: 'land',
    deal: 'sale',
    bedrooms: null,
    bathrooms: null,
    area: 600,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Ikibanza kiri ahantu hateguwe',
    badge: 'Kugurisha',
  },
  {
    title: 'Inzu nziza ifite ibyumba 2 i Muhanga',
    titleEn: 'Bright two-bedroom home in Muhanga',
    location: 'Muhanga, Amajyepfo',
    price: 680000,
    period: 'month',
    kind: 'apartment',
    deal: 'rent',
    bedrooms: 2,
    bathrooms: 2,
    area: 115,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85',
    imageAlt: "Icyumba cy'inzu kigezweho",
    badge: 'Gukodesha',
  },
  {
    title: 'Inzu y’umuryango i Nyanza',
    titleEn: 'Family home in Nyanza',
    location: 'Nyanza, Amajyepfo',
    price: 78000000,
    period: null,
    kind: 'house',
    deal: 'sale',
    bedrooms: 3,
    bathrooms: 2,
    area: 320,
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Inzu y’umuryango ifite ubusitani',
    badge: 'Kugurisha',
  },
  {
    title: 'Ikibanza kinini i Ruhango',
    titleEn: 'Spacious plot in Ruhango',
    location: 'Ruhango, Amajyepfo',
    price: 18000000,
    period: null,
    kind: 'land',
    deal: 'sale',
    bedrooms: null,
    bathrooms: null,
    area: 900,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Ubutaka bwagutse',
    badge: 'Kugurisha',
  },
  {
    title: 'Apartimenti icumbitse neza',
    titleEn: 'Comfortable furnished apartment',
    location: 'Nyanza, Amajyepfo',
    price: 950000,
    period: 'month',
    kind: 'apartment',
    deal: 'rent',
    bedrooms: 2,
    bathrooms: 2,
    area: 130,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Apartimenti icumbitse neza',
    badge: 'Gukodesha',
  },
]

const siteImageSeeds = [
  {
    key: 'hero',
    url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=90',
  },
  {
    key: 'about',
    url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
  },
]

const siteContentSeed = {
  rw: {
    brandName: 'RUHANGO',
    brandSubtitle: 'PROPERTY CONNECT',
    navListings: 'Amatangazo',
    navAbout: 'Abo turibo',
    contact: 'Twandikire',
    navAdmin: 'Ubuyobozi',
    heroEyebrow: 'AHO KUBAKA EJO HAZAZA',
    heroTitle: 'Shaka aho wifuza kuba.',
    heroDescription: 'Amazu n’amasambu yo kugurisha cyangwa gukodesha i Ruhango, Muhanga na Nyanza. Icyicaro gikuru kiri i Ruhango.',
    heroCaption: 'RUHANGO · MUHANGA · NYANZA',
    featured: 'Amatangazo mashya',
    featuredDescription: 'Reba ahantu hashya ho gukodesha cyangwa kugura.',
    aboutEyebrow: 'DUKORANA NAWE',
    aboutTitle: 'Gushaka aho uba biba byoroshye.',
    aboutText: 'RUHANGO PROPERTY CONNECT igufasha kubona inzu cyangwa isambu i Ruhango, Muhanga na Nyanza. Icyicaro gikuru kiri i Ruhango, aho dukorera cyane. Reba amatangazo maze utubaze amakuru arambuye.',
    aboutPointOne: 'Amatangazo y’amazu n’amasambu',
    aboutPointTwo: 'Gukodesha cyangwa kugura',
    aboutPointThree: 'Tuvugishe kuri WhatsApp cyangwa utwoherereze ubutumwa',
    contactEyebrow: 'TURI HANO KUGUFASHA',
    contactTitle: 'Ufite ikibazo cyangwa ushaka ubufasha?',
    contactText: 'Twoherereze ubutumwa, tuzagufasha kubona inzu cyangwa isambu ikubereye.',
    footerText: 'Amazu n’amasambu, byegerejwe.',
    footerLocation: 'Icyicaro gikuru: Ruhango, Rwanda',
  },
  en: {
    brandName: 'RUHANGO',
    brandSubtitle: 'PROPERTY CONNECT',
    navListings: 'Listings',
    navAbout: 'About us',
    contact: 'Contact',
    navAdmin: 'Admin',
    heroEyebrow: 'FIND YOUR NEXT CHAPTER',
    heroTitle: 'Find a place to call home.',
    heroDescription: 'Homes and land for rent or sale in Ruhango, Muhanga, and Nyanza. Our headquarters are in Ruhango.',
    heroCaption: 'RUHANGO · MUHANGA · NYANZA',
    featured: 'Latest listings',
    featuredDescription: 'Explore places available to rent or buy.',
    aboutEyebrow: 'HERE TO HELP',
    aboutTitle: 'Finding your place should feel easy.',
    aboutText: 'RUHANGO PROPERTY CONNECT helps you find a home or plot in Ruhango, Muhanga, and Nyanza. Our headquarters are in Ruhango, where we work most. Browse listings and contact us for details.',
    aboutPointOne: 'Homes and land listings',
    aboutPointTwo: 'Rent or buy',
    aboutPointThree: 'Reach us on WhatsApp or send a message',
    contactEyebrow: 'WE’RE HERE FOR YOU',
    contactTitle: 'Have a question or need a hand?',
    contactText: 'Send us a message and we’ll help you find a home or plot that suits you.',
    footerText: 'Property, brought closer.',
    footerLocation: 'Headquarters: Ruhango, Rwanda',
  },
  contactInfo: {
    whatsappNumber: '250795925926',
    instagramUrl: 'https://www.instagram.com/ruhango_property250/',
    instagramHandle: '@ruhango_property250',
    email: 'gisubizoprince9@gmail.com',
  },
}

const siteContentKeys = Object.keys(siteContentSeed.rw)

const propertyColumns = [
  'title', 'titleEn', 'location', 'price', 'period', 'kind', 'deal',
  'bedrooms', 'bathrooms', 'area', 'image', 'imageAlt', 'badge',
]

function propertyFromRow(row) {
  const images = row.images || []
  return {
    ...row,
    id: Number(row.id),
    price: Number(row.price),
    bedrooms: row.bedrooms === null ? null : Number(row.bedrooms),
    bathrooms: row.bathrooms === null ? null : Number(row.bathrooms),
    area: Number(row.area),
    images,
    image: images[0] || '',
  }
}

function propertyImageUrl(propertyId, position) {
  return `/api/properties/${propertyId}/images/${position}`
}

async function propertyWithImages(row, connection = pool) {
  const [imageRows] = await connection.execute(
    'SELECT position FROM property_images WHERE property_id = ? ORDER BY position',
    [row.id],
  )
  return propertyFromRow({
    ...row,
    images: imageRows.map(({ position }) => propertyImageUrl(row.id, Number(position))),
  })
}

function imageMimeFromBuffer(buffer) {
  if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) return 'image/jpeg'
  if (
    buffer.length >= 8 &&
    buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  ) return 'image/png'
  if (
    buffer.length >= 12 &&
    buffer.toString('ascii', 0, 4) === 'RIFF' &&
    buffer.toString('ascii', 8, 12) === 'WEBP'
  ) return 'image/webp'
  return null
}

async function downloadImage(url) {
  const imageUrl = new URL(url)
  if (imageUrl.protocol !== 'https:' || imageUrl.hostname !== 'images.unsplash.com') {
    throw new Error('Only approved Unsplash image URLs can be imported into the image database.')
  }

  const response = await fetch(imageUrl, {
    redirect: 'error',
    signal: AbortSignal.timeout(15000),
  })
  if (!response.ok) throw new Error(`Image download failed with status ${response.status}.`)

  const contentType = response.headers.get('content-type')?.split(';')[0].trim().toLowerCase()
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(contentType)) {
    throw new Error(`Unsupported image content type: ${contentType || 'missing'}.`)
  }
  const contentLength = Number(response.headers.get('content-length'))
  if (Number.isFinite(contentLength) && contentLength > 5 * 1024 * 1024) {
    throw new Error('Image download exceeds the 5 MB storage limit.')
  }

  const reader = response.body.getReader()
  const chunks = []
  let totalBytes = 0
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    totalBytes += value.byteLength
    if (totalBytes > 5 * 1024 * 1024) {
      await reader.cancel()
      throw new Error('Image download exceeds the 5 MB storage limit.')
    }
    chunks.push(Buffer.from(value))
  }

  const buffer = Buffer.concat(chunks)
  const detectedMime = imageMimeFromBuffer(buffer)
  if (!detectedMime || detectedMime !== contentType) {
    throw new Error('Downloaded image content does not match its declared image type.')
  }
  return { buffer, mime: detectedMime }
}

function propertyRequest(req) {
  if (typeof req.body?.property !== 'string') return req.body
  try {
    return JSON.parse(req.body.property)
  } catch {
    return null
  }
}

function validateProperty(body, hasUploadedImage) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return false
  const validText = ['title', 'titleEn', 'location', 'imageAlt', 'badge']
    .every((key) => typeof body[key] === 'string' && body[key].trim())
  const validEnums = ['house', 'apartment', 'land'].includes(body.kind) &&
    ['sale', 'rent'].includes(body.deal)
  const validNumbers = Number.isFinite(Number(body.price)) && Number(body.price) > 0 &&
    Number.isFinite(Number(body.area)) && Number(body.area) > 0 &&
    ['bedrooms', 'bathrooms'].every((key) =>
      body[key] === null || (Number.isInteger(Number(body[key])) && Number(body[key]) >= 0),
    )
  let validImage = hasUploadedImage
  try {
    if (!validImage && typeof body.image === 'string') {
      validImage = /^\/api\/properties\/\d+\/images?\/\d+$/.test(body.image) ||
        /^\/api\/properties\/\d+\/image$/.test(body.image)
    }
  } catch {
    validImage = false
  }
  return validText && validEnums && validNumbers && validImage
}

function requireAdmin(req, res, next) {
  const token = req.get('authorization')?.replace(/^Bearer\s+/i, '')
  if (!token) return res.status(401).json({ error: 'Authentication required.' })
  try {
    req.admin = jwt.verify(token, jwtSecret)
    return next()
  } catch {
    return res.status(401).json({ error: 'Your admin session is invalid or expired.' })
  }
}

app.get('/api/health', async (req, res, next) => {
  try {
    await pool.query('SELECT 1')
    res.json({ status: 'ok', database: 'connected' })
  } catch (error) {
    next(error)
  }
})

app.post('/api/admin/login', async (req, res, next) => {
  const { username, password } = req.body || {}
  if (typeof username !== 'string' || !username.trim() || typeof password !== 'string') {
    return res.status(401).json({ error: 'Invalid username or password.' })
  }
  try {
    const [admins] = await pool.execute(
      'SELECT username, password_hash FROM `admin` WHERE username = ? LIMIT 1',
      [username.trim()],
    )
    if (!admins.length || !(await bcrypt.compare(password, admins[0].password_hash))) {
      return res.status(401).json({ error: 'Invalid username or password.' })
    }
    return res.json({
      token: jwt.sign({ username: admins[0].username }, jwtSecret, { expiresIn: '8h' }),
    })
  } catch (error) {
    return next(error)
  }
})

app.get('/api/site-content', async (req, res, next) => {
  try {
    const [rows] = await pool.execute('SELECT content_json FROM site_content WHERE content_id = 1')
    if (!rows.length) throw new Error('Site content has not been initialized.')
    return res.json(typeof rows[0].content_json === 'string'
      ? JSON.parse(rows[0].content_json)
      : rows[0].content_json)
  } catch (error) {
    return next(error)
  }
})

app.put('/api/site-content', requireAdmin, async (req, res, next) => {
  const content = req.body
  if (!content || typeof content !== 'object' || Array.isArray(content)) {
    return res.status(400).json({ error: 'Invalid site content.' })
  }
  const validTranslations = ['rw', 'en'].every((language) => {
    const translation = content[language]
    return translation && typeof translation === 'object' && !Array.isArray(translation) &&
      siteContentKeys.every((key) =>
        typeof translation[key] === 'string' &&
        translation[key].trim() &&
        translation[key].length <= 2000,
      )
  })
  const contactInfo = content.contactInfo
  const validContact = contactInfo && typeof contactInfo === 'object' &&
    typeof contactInfo.whatsappNumber === 'string' &&
    /^\+?\d{8,15}$/.test(contactInfo.whatsappNumber) &&
    typeof contactInfo.instagramUrl === 'string' &&
    /^https:\/\/(www\.)?instagram\.com\/[A-Za-z0-9._-]+\/?$/.test(contactInfo.instagramUrl) &&
    typeof contactInfo.instagramHandle === 'string' &&
    contactInfo.instagramHandle.trim().length <= 100 &&
    typeof contactInfo.email === 'string' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email)
  if (!validTranslations || !validContact) {
    return res.status(400).json({ error: 'Please check the page text and contact details.' })
  }
  const normalizedContent = {
    rw: Object.fromEntries(siteContentKeys.map((key) => [key, content.rw[key].trim()])),
    en: Object.fromEntries(siteContentKeys.map((key) => [key, content.en[key].trim()])),
    contactInfo: {
      whatsappNumber: contactInfo.whatsappNumber.replace(/^\+/, ''),
      instagramUrl: contactInfo.instagramUrl.trim(),
      instagramHandle: contactInfo.instagramHandle.trim(),
      email: contactInfo.email.trim(),
    },
  }
  try {
    await pool.execute(
      'UPDATE site_content SET content_json = ? WHERE content_id = 1',
      [JSON.stringify(normalizedContent)],
    )
    return res.json(normalizedContent)
  } catch (error) {
    return next(error)
  }
})

app.get('/api/properties', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT ${propertyColumns.join(', ')}, id FROM properties ORDER BY id DESC`,
    )
    const [imageRows] = rows.length
      ? await pool.query(
        'SELECT property_id, position FROM property_images WHERE property_id IN (?) ORDER BY property_id, position',
        [rows.map(({ id }) => id)],
      )
      : [[]]
    const imagesByProperty = new Map()
    for (const image of imageRows) {
      const images = imagesByProperty.get(Number(image.property_id)) || []
      images.push(propertyImageUrl(image.property_id, Number(image.position)))
      imagesByProperty.set(Number(image.property_id), images)
    }
    res.json(rows.map((row) =>
      propertyFromRow({ ...row, images: imagesByProperty.get(Number(row.id)) || [] }),
    ))
  } catch (error) {
    next(error)
  }
})

app.get('/api/properties/:id/image', async (req, res, next) => {
  const id = Number(req.params.id)
  if (!Number.isSafeInteger(id) || id < 1) return res.status(400).json({ error: 'Invalid property id.' })
  try {
    const [rows] = await pool.execute(
      'SELECT image_data, image_mime FROM property_images WHERE property_id = ? AND position = 1',
      [id],
    )
    if (!rows.length || !rows[0].image_data) {
      return res.status(404).json({ error: 'Image not found.' })
    }
    res.set('Content-Type', rows[0].image_mime)
    res.set('Cache-Control', 'no-cache')
    return res.send(rows[0].image_data)
  } catch (error) {
    return next(error)
  }
})

app.get('/api/properties/:id/images/:position', async (req, res, next) => {
  const id = Number(req.params.id)
  const position = Number(req.params.position)
  if (!Number.isSafeInteger(id) || id < 1 ||
      !Number.isSafeInteger(position) || position < 1 || position > 3) {
    return res.status(400).json({ error: 'Invalid property image.' })
  }
  try {
    const [rows] = await pool.execute(
      'SELECT image_data, image_mime FROM property_images WHERE property_id = ? AND position = ?',
      [id, position],
    )
    if (!rows.length) return res.status(404).json({ error: 'Image not found.' })
    res.set('Content-Type', rows[0].image_mime)
    res.set('Cache-Control', 'no-cache')
    return res.send(rows[0].image_data)
  } catch (error) {
    return next(error)
  }
})

app.get('/api/site-images/:key', async (req, res, next) => {
  try {
    const [rows] = await pool.execute(
      'SELECT image_data, image_mime FROM site_images WHERE image_key = ?',
      [req.params.key],
    )
    if (!rows.length) return res.status(404).json({ error: 'Image not found.' })
    res.set('Content-Type', rows[0].image_mime)
    res.set('Cache-Control', 'no-cache')
    return res.send(rows[0].image_data)
  } catch (error) {
    return next(error)
  }
})

app.post('/api/properties', requireAdmin, uploadImage.array('images', 3), async (req, res, next) => {
  const property = propertyRequest(req)
  const files = req.files || []
  const imageMimes = files.map(({ buffer }) => imageMimeFromBuffer(buffer))
  if (imageMimes.some((mime) => !mime)) {
    return res.status(415).json({ error: 'One or more uploaded files are not valid JPEG, PNG, or WebP images.' })
  }
  if (!validateProperty(property, files.length > 0) || files.length < 1) {
    return res.status(400).json({ error: 'Invalid property data. Add at least one image.' })
  }
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()
    const values = propertyColumns.map((key) =>
      key === 'period'
        ? (property.deal === 'rent' ? 'month' : null)
        : key === 'image'
          ? ''
          : property[key] ?? null,
    )
    const [result] = await connection.execute(
      `INSERT INTO properties (${propertyColumns.join(', ')}, image_data, image_mime)
       VALUES (${propertyColumns.map(() => '?').join(', ')}, NULL, NULL)`,
      values,
    )
    const propertyId = result.insertId
    for (const [index, file] of files.entries()) {
      await connection.execute(
        'INSERT INTO property_images (property_id, position, image_data, image_mime) VALUES (?, ?, ?, ?)',
        [propertyId, index + 1, file.buffer, imageMimes[index]],
      )
    }
    const [rows] = await connection.execute(
      `SELECT ${propertyColumns.join(', ')}, id FROM properties WHERE id = ?`,
      [propertyId],
    )
    await connection.commit()
    res.status(201).json(await propertyWithImages(rows[0]))
  } catch (error) {
    await connection.rollback()
    next(error)
  } finally {
    connection.release()
  }
})

app.put('/api/properties/:id', requireAdmin, uploadImage.array('images', 3), async (req, res, next) => {
  const id = Number(req.params.id)
  const property = propertyRequest(req)
  const files = req.files || []
  const imageMimes = files.map(({ buffer }) => imageMimeFromBuffer(buffer))
  if (imageMimes.some((mime) => !mime)) {
    return res.status(415).json({ error: 'One or more uploaded files are not valid JPEG, PNG, or WebP images.' })
  }
  if (!Number.isSafeInteger(id) || id < 1 || !validateProperty(property, files.length > 0)) {
    return res.status(400).json({ error: 'Invalid property data or missing image.' })
  }
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()
    const [existingImages] = await connection.execute(
      'SELECT position FROM property_images WHERE property_id = ? ORDER BY position',
      [id],
    )
    const imageAction = req.body?.imageAction || 'append'
    if (!['append', 'replace'].includes(imageAction)) {
      await connection.rollback()
      return res.status(400).json({ error: 'Invalid image update mode.' })
    }
    if (!existingImages.length && !files.length) {
      await connection.rollback()
      return res.status(400).json({ error: 'Add at least one image to this property.' })
    }
    if (files.length && imageAction === 'append' && existingImages.length + files.length > 3) {
      await connection.rollback()
      return res.status(400).json({ error: 'A property can have no more than 3 images.' })
    }
    const values = propertyColumns.map((key) =>
      key === 'period'
        ? (property.deal === 'rent' ? 'month' : null)
        : key === 'image'
          ? ''
          : property[key] ?? null,
    )
    const [result] = await connection.execute(
      `UPDATE properties SET ${propertyColumns.map((key) => `${key} = ?`).join(', ')}, image_data = NULL, image_mime = NULL WHERE id = ?`,
      [...values, id],
    )
    if (!result.affectedRows) {
      await connection.rollback()
      return res.status(404).json({ error: 'Property not found.' })
    }
    if (files.length) {
      const firstPosition = imageAction === 'replace'
        ? 1
        : (Number(existingImages[existingImages.length - 1]?.position) || 0) + 1
      if (imageAction === 'replace') {
        await connection.execute('DELETE FROM property_images WHERE property_id = ?', [id])
      }
      for (const [index, file] of files.entries()) {
        await connection.execute(
          'INSERT INTO property_images (property_id, position, image_data, image_mime) VALUES (?, ?, ?, ?)',
          [id, firstPosition + index, file.buffer, imageMimes[index]],
        )
      }
    }
    const [rows] = await connection.execute(
      `SELECT ${propertyColumns.join(', ')}, id FROM properties WHERE id = ?`,
      [id],
    )
    await connection.commit()
    res.json(await propertyWithImages(rows[0]))
  } catch (error) {
    await connection.rollback()
    next(error)
  } finally {
    connection.release()
  }
})

app.delete('/api/properties/:id/image', requireAdmin, async (req, res, next) => {
  const id = Number(req.params.id)
  if (!Number.isSafeInteger(id) || id < 1) return res.status(400).json({ error: 'Invalid property id.' })
  try {
    const [properties] = await pool.execute('SELECT id FROM properties WHERE id = ?', [id])
    if (!properties.length) return res.status(404).json({ error: 'Property not found.' })
    await pool.execute('DELETE FROM property_images WHERE property_id = ?', [id])
    await pool.execute(
      "UPDATE properties SET image_data = NULL, image_mime = NULL, image = '' WHERE id = ?",
      [id],
    )
    return res.status(204).end()
  } catch (error) {
    return next(error)
  }
})

app.delete('/api/properties/:id', requireAdmin, async (req, res, next) => {
  const id = Number(req.params.id)
  if (!Number.isSafeInteger(id) || id < 1) return res.status(400).json({ error: 'Invalid property id.' })
  try {
    const [result] = await pool.execute('DELETE FROM properties WHERE id = ?', [id])
    if (!result.affectedRows) return res.status(404).json({ error: 'Property not found.' })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.get('/api/messages', requireAdmin, async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM messages ORDER BY created_at DESC, id DESC')
    res.json(rows.map((row) => ({
      id: Number(row.id),
      type: row.type,
      name: row.name,
      phone: row.phone,
      message: row.message,
      propertyTitle: row.property_title,
      propertyLocation: row.property_location,
      createdAt: new Date(`${row.created_at.replace(' ', 'T')}Z`).toISOString(),
    })))
  } catch (error) {
    next(error)
  }
})

app.post('/api/messages', async (req, res, next) => {
  const { name, phone, message, type, propertyTitle, propertyLocation } = req.body || {}
  if (
    typeof name !== 'string' || !name.trim() || name.length > 160 ||
    typeof phone !== 'string' || !phone.trim() || phone.length > 40 ||
    typeof message !== 'string' || !message.trim() || message.length > 5000 ||
    (type !== undefined && !['contact', 'property-inquiry'].includes(type))
  ) {
    return res.status(400).json({ error: 'Please provide a valid name, phone number, and message.' })
  }
  try {
    const [result] = await pool.execute(
      `INSERT INTO messages (type, name, phone, message, property_title, property_location)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        type || 'contact',
        name.trim(),
        phone.trim(),
        message.trim(),
        typeof propertyTitle === 'string' ? propertyTitle.slice(0, 255) : null,
        typeof propertyLocation === 'string' ? propertyLocation.slice(0, 255) : null,
      ],
    )
    res.status(201).json({ id: result.insertId })
  } catch (error) {
    next(error)
  }
})

app.delete('/api/messages/:id', requireAdmin, async (req, res, next) => {
  const id = Number(req.params.id)
  if (!Number.isSafeInteger(id) || id < 1) return res.status(400).json({ error: 'Invalid message id.' })
  try {
    const [result] = await pool.execute('DELETE FROM messages WHERE id = ?', [id])
    if (!result.affectedRows) return res.status(404).json({ error: 'Message not found.' })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.use((error, req, res, next) => {
  console.error('API request failed:', error)
  if (res.headersSent) return next(error)
  const status = error instanceof multer.MulterError
    ? (error.code === 'LIMIT_FILE_SIZE' ? 413 : 400)
    : (error.status || 500)
  const message = status === 413
    ? 'Image is too large. Maximum size is 5 MB.'
    : error instanceof multer.MulterError && error.code === 'LIMIT_UNEXPECTED_FILE'
      ? 'A property can have up to 3 photos.'
    : status === 500
      ? 'A server error occurred. Check the API logs.'
      : error.message
  return res.status(status).json({ error: message })
})

async function start() {
  if (!jwtSecret || jwtSecret.length < 32) {
    throw new Error('JWT_SECRET must be set to a random value of at least 32 characters.')
  }
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`admin\` (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)
  const [legacyAdminTable] = await pool.execute(
    `SELECT COUNT(*) AS count
     FROM information_schema.tables
     WHERE table_schema = DATABASE() AND table_name = ?`,
    ['admin_users'],
  )
  if (Number(legacyAdminTable[0].count) > 0) {
    await pool.query(
      'INSERT IGNORE INTO `admin` (username, password_hash, created_at) SELECT username, password_hash, created_at FROM admin_users',
    )
  }
  const [adminRows] = await pool.query('SELECT COUNT(*) AS count FROM `admin`')
  if (Number(adminRows[0].count) === 0) {
    if (!initialAdminUsername || !initialAdminPasswordHash) {
      throw new Error(
        'The admin table is empty. Set ADMIN_USERNAME and ADMIN_PASSWORD_HASH to create the initial admin account.',
      )
    }
    await pool.execute(
      'INSERT IGNORE INTO `admin` (username, password_hash) VALUES (?, ?)',
      [initialAdminUsername, initialAdminPasswordHash],
    )
  }
  await pool.query(`
    CREATE TABLE IF NOT EXISTS site_content (
      content_id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
      content_json JSON NOT NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `)
  await pool.execute(
    'INSERT IGNORE INTO site_content (content_id, content_json) VALUES (1, ?)',
    [JSON.stringify(siteContentSeed)],
  )
  await pool.query(`
    CREATE TABLE IF NOT EXISTS properties (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      titleEn VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      price BIGINT UNSIGNED NOT NULL,
      period VARCHAR(32) NULL,
      kind ENUM('house', 'apartment', 'land') NOT NULL,
      deal ENUM('sale', 'rent') NOT NULL,
      bedrooms SMALLINT UNSIGNED NULL,
      bathrooms SMALLINT UNSIGNED NULL,
      area INT UNSIGNED NOT NULL,
      image TEXT NOT NULL,
      image_data LONGBLOB NULL,
      image_mime VARCHAR(32) NULL,
      imageAlt VARCHAR(500) NOT NULL,
      badge VARCHAR(100) NOT NULL
    )
  `)
  const [imageDataColumn] = await pool.query("SHOW COLUMNS FROM properties LIKE 'image_data'")
  if (!imageDataColumn.length) {
    await pool.query('ALTER TABLE properties ADD COLUMN image_data LONGBLOB NULL')
  }
  const [imageMimeColumn] = await pool.query("SHOW COLUMNS FROM properties LIKE 'image_mime'")
  if (!imageMimeColumn.length) {
    await pool.query('ALTER TABLE properties ADD COLUMN image_mime VARCHAR(32) NULL')
  }
  await pool.query(`
    CREATE TABLE IF NOT EXISTS property_images (
      property_id BIGINT UNSIGNED NOT NULL,
      position TINYINT UNSIGNED NOT NULL,
      image_data LONGBLOB NOT NULL,
      image_mime VARCHAR(32) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (property_id, position),
      CONSTRAINT fk_property_images_property
        FOREIGN KEY (property_id) REFERENCES properties (id) ON DELETE CASCADE
    )
  `)
  await pool.query(`
    INSERT IGNORE INTO property_images (property_id, position, image_data, image_mime)
    SELECT id, 1, image_data, image_mime
    FROM properties
    WHERE image_data IS NOT NULL AND image_mime IS NOT NULL
  `)
  await pool.query(
    "UPDATE properties SET image_data = NULL, image_mime = NULL, image = '' WHERE image_data IS NOT NULL",
  )
  await pool.query(`
    CREATE TABLE IF NOT EXISTS site_images (
      image_key VARCHAR(100) NOT NULL PRIMARY KEY,
      image_data LONGBLOB NOT NULL,
      image_mime VARCHAR(32) NOT NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `)
  for (const siteImage of siteImageSeeds) {
    const [storedImages] = await pool.execute(
      'SELECT image_key FROM site_images WHERE image_key = ?',
      [siteImage.key],
    )
    if (!storedImages.length) {
      const { buffer, mime } = await downloadImage(siteImage.url)
      await pool.execute(
        'INSERT INTO site_images (image_key, image_data, image_mime) VALUES (?, ?, ?)',
        [siteImage.key, buffer, mime],
      )
    }
  }
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      type ENUM('contact', 'property-inquiry') NOT NULL DEFAULT 'contact',
      name VARCHAR(160) NOT NULL,
      phone VARCHAR(40) NOT NULL,
      message TEXT NOT NULL,
      property_title VARCHAR(255) NULL,
      property_location VARCHAR(255) NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS app_metadata (
      key_name VARCHAR(100) NOT NULL PRIMARY KEY,
      value TEXT NOT NULL
    )
  `)
  const [seedRows] = await pool.execute(
    'SELECT value FROM app_metadata WHERE key_name = ?',
    ['sample_properties_seeded'],
  )
  if (!seedRows.length) {
    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM properties')
    if (Number(rows[0].count) === 0) {
      const columns = propertyColumns
      await pool.query(
        `INSERT INTO properties (${columns.join(', ')}) VALUES ?`,
        [seedProperties.map((property) => columns.map((key) => property[key] ?? null))],
      )
    }
    await pool.execute(
      'INSERT INTO app_metadata (key_name, value) VALUES (?, ?)',
      ['sample_properties_seeded', 'true'],
    )
  }
  const [propertiesWithExternalImages] = await pool.query(
    `SELECT id, image FROM properties
     WHERE image <> ''
       AND NOT EXISTS (
         SELECT 1 FROM property_images WHERE property_images.property_id = properties.id
       )`,
  )
  const downloadedImages = new Map()
  for (const property of propertiesWithExternalImages) {
    const imageUrl = new URL(property.image)
    if (imageUrl.protocol !== 'https:' || imageUrl.hostname !== 'images.unsplash.com') {
      throw new Error(
        `Property ${property.id} has an image outside the approved Unsplash host. Replace it with an uploaded image before starting the API.`,
      )
    }
    let storedImage = downloadedImages.get(property.image)
    if (!storedImage) {
      storedImage = await downloadImage(property.image)
      downloadedImages.set(property.image, storedImage)
    }
    await pool.execute(
      'INSERT IGNORE INTO property_images (property_id, position, image_data, image_mime) VALUES (?, 1, ?, ?)',
      [property.id, storedImage.buffer, storedImage.mime],
    )
    await pool.execute('UPDATE properties SET image = ? WHERE id = ?', ['', property.id])
  }
  app.listen(port, () => console.log(`Property API listening on http://localhost:${port}`))
}

start().catch((error) => {
  console.error('Could not start the API:', error)
  process.exitCode = 1
})
