export const REMEMBER_CAPTIONS = [
  'Would they spend ₱300 on milk tea? 👀',
  'Camera fund isn’t going to fill itself.',
  'Future you has a camera. Be nice to her.',
  'One less impulse buy = one step closer to that lens.',
  'Your idols called. They said pace yourself. (They didn’t. But still.)',
  'The X-T5 is patient. You can be too.',
  'Small spends add up. So do small saves.',
  'Milk tea is temporary. Bokeh is forever. (Mostly.)',
]

export function pickRememberCaption(): string {
  const i = Math.floor(Math.random() * REMEMBER_CAPTIONS.length)
  return REMEMBER_CAPTIONS[i]
}
