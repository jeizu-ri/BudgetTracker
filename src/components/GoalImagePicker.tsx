import { ImagePlus } from 'lucide-react'
import { useRef, useState } from 'react'
import { fileToGoalImage } from '../lib/image'
import { Button } from './ui/button'

/** Pick, replace or remove the picture of what the user is saving for. */
export function GoalImagePicker({
  value,
  onChange,
}: {
  value: string | null
  onChange: (image: string | null) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onFile = async (file: File | undefined) => {
    if (!file) return
    setError(null)
    setBusy(true)
    try {
      onChange(await fileToGoalImage(file))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not use that image.')
    } finally {
      setBusy(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        aria-label="Goal picture"
        tabIndex={-1}
        onChange={(e) => void onFile(e.target.files?.[0])}
      />

      {value ? (
        <div className="space-y-1">
          <div className="aspect-[16/10] w-full overflow-hidden rounded-frame bg-frame">
            <img src={value} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="flex gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={busy}
              onClick={() => inputRef.current?.click()}
            >
              Change picture
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-muted"
              onClick={() => onChange(null)}
            >
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          className="tap-highlight-none flex aspect-[16/6] w-full flex-col items-center justify-center gap-1.5 rounded-frame border border-dashed border-muted/60 text-[15px] font-semibold text-ink"
        >
          <ImagePlus className="h-5 w-5" strokeWidth={1.75} />
          {busy ? 'Preparing…' : 'Add a picture of your goal'}
        </button>
      )}

      {error && (
        <p className="text-sm font-medium text-warn" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
