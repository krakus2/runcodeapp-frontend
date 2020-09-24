export const hexToRgb = (hex) =>
  hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => '#' + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16))

export const addAlphaChannel = (color, a) =>
  `rgba(${hexToRgb(color).join(', ')}, ${a})`

export const isMobile = () => {
  if (/iPhone|Android/i.test(navigator.userAgent) || window.innerWidth < 900) {
    return true
  } else {
    return false
  }
}

export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  value === '' ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)
