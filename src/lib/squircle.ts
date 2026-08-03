/*
 * Squircle corners — cubic Bezier curves that mimic a superellipse.
 *
 * Elements marked with [data-squircle] get a `clip-path: path("…")` whose
 * corners are drawn with cubic Beziers spread wider than a circular arc,
 * approximating an iOS-style superellipse. The attribute value lists corner
 * radii in rem following CSS shorthand order (top-left, top-right,
 * bottom-right, bottom-left); an empty value uses the default radius.
 * Without JavaScript (or without `clip-path: path()` support) each element's
 * CSS border-radius utilities stay in effect as the fallback.
 */

/** Default corner radius in rem — keep in sync with the CSS fallbacks. */
const DEFAULT_RADIUS = 0.75

/** How far the corner curve spreads along each edge, relative to the radius. */
const CORNER_SPREAD = 1.8

/** Control-point distance from the corner, relative to the spread. */
const CONTROL = 0.37

/** How far the path runs outside the border box along straight edges, in px. */
const BLEED = 1

type Radii = [number, number, number, number]

export function squirclePath(w: number, h: number, radii: Radii): string {
    const [tl, tr, br, bl] = radii.map((r) => Math.min(r * CORNER_SPREAD, w / 2, h / 2)) as Radii
    const c = (d: number) => d * CONTROL
    const p = (n: number) => String(Math.round(n * 100) / 100)
    const B = BLEED

    // Straight edges run BLEED px outside the border box and only step back
    // in where a corner curve begins or ends (the steps themselves lie
    // outside the box, so they never show). Clipping exactly along an edge
    // antialiases it, leaving the edge a hair inside the box — a visible
    // seam against any adjacent surface; bleeding past flush edges keeps the
    // element's natural edge rendering there so it abuts cleanly.
    return [
        `M ${p(tl > 0 ? tl : -B)} ${p(-B)}`,
        `L ${p(tr > 0 ? w - tr : w + B)} ${p(-B)}`,
        tr > 0 ? `L ${p(w - tr)} 0 C ${p(w - c(tr))} 0 ${p(w)} ${p(c(tr))} ${p(w)} ${p(tr)} L ${p(w + B)} ${p(tr)}` : '',
        `L ${p(w + B)} ${p(br > 0 ? h - br : h + B)}`,
        br > 0 ? `L ${p(w)} ${p(h - br)} C ${p(w)} ${p(h - c(br))} ${p(w - c(br))} ${p(h)} ${p(w - br)} ${p(h)} L ${p(w - br)} ${p(h + B)}` : '',
        `L ${p(bl > 0 ? bl : -B)} ${p(h + B)}`,
        bl > 0 ? `L ${p(bl)} ${p(h)} C ${p(c(bl))} ${p(h)} 0 ${p(h - c(bl))} 0 ${p(h - bl)} L ${p(-B)} ${p(h - bl)}` : '',
        `L ${p(-B)} ${p(tl > 0 ? tl : -B)}`,
        tl > 0 ? `L 0 ${p(tl)} C 0 ${p(c(tl))} ${p(c(tl))} 0 ${p(tl)} 0 L ${p(tl)} ${p(-B)}` : '',
        'Z',
    ]
        .filter(Boolean)
        .join(' ')
}

/** Parse the data attribute as CSS border-radius shorthand, in rem. */
function parseRadii(value: string | undefined): Radii {
    const parts = (value ?? '')
        .trim()
        .split(/\s+/)
        .map((part) => Number.parseFloat(part))
        .filter((n) => Number.isFinite(n) && n >= 0)

    const [a = DEFAULT_RADIUS, b = a, c = a, d = b] = parts
    return [a, b, c, d]
}

export function applySquircles(selector = '[data-squircle]'): void {
    if (
        typeof ResizeObserver === 'undefined' ||
        typeof CSS === 'undefined' ||
        !CSS.supports('clip-path', 'path("M 0 0 H 1 V 1 Z")')
    )
        return

    const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
            const el = entry.target as HTMLElement
            // Fractional border-box size — offsetWidth/Height round to integers,
            // which undersizes the path and leaves hairline slivers unclipped
            // (or clipped short) along the far edges.
            const box = entry.borderBoxSize?.[0]
            const w = box ? box.inlineSize : el.offsetWidth
            const h = box ? box.blockSize : el.offsetHeight
            if (w === 0 || h === 0) continue

            const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
            const radii = parseRadii(el.dataset.squircle).map((r) => r * rem) as Radii

            el.style.clipPath = `path("${squirclePath(w, h, radii)}")`
            el.style.borderRadius = '0'
        }
    })

    document.querySelectorAll<HTMLElement>(selector).forEach((el) => observer.observe(el))
}
