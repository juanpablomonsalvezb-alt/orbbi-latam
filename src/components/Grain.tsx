/* Grain noise overlay — SVG turbulence, zero deps, instant load */
export default function Grain() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed', inset: 0,
        zIndex: 9998, pointerEvents: 'none',
        opacity: 0.055,
        mixBlendMode: 'overlay',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%" height="100%"
        style={{ display: 'block' }}
      >
        <filter id="g">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#g)" />
      </svg>
    </div>
  )
}
