import { getStrapiURL } from './api'

import { StrapiImageMedia, StrapiMedia } from './apiInterfaces'

export function getStrapiMedia(media: StrapiMedia) {
  const { url } = media.data.attributes
  const imageUrl = url.startsWith('/') ? getStrapiURL(url) : url
  return imageUrl
}

export function getStrapiImageMedia(imageMedia: StrapiImageMedia) {
  return {
    ...imageMedia.data.attributes,
    url: getStrapiMedia(imageMedia)
  }
}
