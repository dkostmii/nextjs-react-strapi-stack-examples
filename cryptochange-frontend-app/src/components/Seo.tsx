import Head from 'next/head'
import { useContext } from 'react'
import { GlobalContext } from '@/pages/_app'
import { getStrapiMedia, getStrapiImageMedia } from '@/lib/media'
import { GlobalData, SeoData, OptionalGlobalData } from '@/lib/apiInterfaces'

interface SeoProps {
  seo?: Partial<SeoData>
}

const Seo = ({ seo }: SeoProps) => {
  const optionalGlobalData = useContext<OptionalGlobalData>(GlobalContext)

  if (Object.keys(optionalGlobalData).length === 0) {
    throw new TypeError(
      'Expected GlobalContext to contain global data. Got empty object {}.'
    )
  }

  const globalData = optionalGlobalData as GlobalData

  const { defaultSeo, siteName } = globalData

  let seoWithDefaults = defaultSeo
  if (seo) {
    seoWithDefaults = { ...seoWithDefaults, ...seo }
  }

  const cardImage = getStrapiImageMedia(seoWithDefaults.cardImage)

  const fullSeo = {
    ...seoWithDefaults,
    metaTitle: `${seoWithDefaults.metaTitle} | ${siteName}`,
    cardImage: {
      ...cardImage,
      width: cardImage.width.toFixed(0),
      height: cardImage.height.toFixed(0)
    }
  }

  return (
    <Head>
      <title>{fullSeo.metaTitle}</title>
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullSeo.metaTitle} />
      <meta property="twitter:title" content={fullSeo.metaTitle} />

      <meta name="description" content={fullSeo.metaDescription} />
      <meta property="og:description" content={fullSeo.metaDescription} />
      <meta property="twitter:description" content={fullSeo.metaDescription} />

      <meta name="theme-color" content={fullSeo.themeColor} />
      <meta name="msapplication-navbutton-color" content={fullSeo.themeColor} />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content={fullSeo.themeColor}
      />

      <meta name="image" content={fullSeo.cardImage.url} />
      <meta property="og:image" content={fullSeo.cardImage.url} />
      <meta property="og:image:width" content={fullSeo.cardImage.width} />
      <meta property="og:image:height" content={fullSeo.cardImage.height} />
      <meta property="twitter:image" content={fullSeo.cardImage.url} />
      <meta property="twitter:card" content="summary_large_image" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullSeo.websiteUrl} />
    </Head>
  )
}

export default Seo
