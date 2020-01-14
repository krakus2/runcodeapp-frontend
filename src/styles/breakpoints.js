import { sizes } from 'theme'

export const device = {
  mobile: `(min-width: ${sizes.mobile}px) and (max-width: ${sizes.desktop -
    1}px)`,
  desktop: `(min-width: ${sizes.desktop}px)`
}
