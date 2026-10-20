const MAX_SIDE = 800
/** Firestore documents cap at 1 MB; keep the picture far below that. */
const MAX_BYTES = 180_000

function loadBitmap(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Could not read that image.'))
    }
    img.src = url
  })
}

/** Shrinks a picked photo to a small JPEG data URL that fits inside a goal document. */
export async function fileToGoalImage(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Pick an image file.')
  }
  const img = await loadBitmap(file)
  let side = MAX_SIDE
  let quality = 0.78

  for (let attempt = 0; attempt < 6; attempt++) {
    const scale = Math.min(1, side / Math.max(img.width, img.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(img.width * scale))
    canvas.height = Math.max(1, Math.round(img.height * scale))
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Could not process that image.')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    const dataUrl = canvas.toDataURL('image/jpeg', quality)
    // base64 length * 3/4 is the byte size
    if (dataUrl.length * 0.75 <= MAX_BYTES) return dataUrl
    side = Math.round(side * 0.8)
    quality = Math.max(0.5, quality - 0.06)
  }
  throw new Error('That image is too large. Try a smaller one.')
}
