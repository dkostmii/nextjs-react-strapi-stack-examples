export interface StrapiMedia {
  data: {
    attributes: {
      url: string
    }
  }
}

export interface StrapiImageMedia extends StrapiMedia {
  data: {
    attributes: {
      url: string
      width: number
      height: number
      alternativeText: string
    }
  }
}

export interface SeoData {
  metaTitle: string
  metaDescription: string
  themeColor: string
  cardImage: StrapiImageMedia
  websiteUrl: string
}

export interface GlobalData {
  siteName: string
  defaultSeo: SeoData
  favicon: StrapiImageMedia
}

export type OptionalGlobalData = GlobalData | {}
