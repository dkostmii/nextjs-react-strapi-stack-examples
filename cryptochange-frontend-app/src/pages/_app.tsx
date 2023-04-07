import '@/styles/globals.css'
import NextApp from 'next/app'
import type { AppProps } from 'next/app'
import type { AppContext } from 'next/app'

import Head from 'next/head'

import { createContext } from 'react'
import { fetchAPI } from '../lib/api'
import { getStrapiMedia, StrapiMedia } from '../lib/media'

export const GlobalContext = createContext({})

interface AppStaticProps extends AppProps {
  pageProps: {
    global: {
      attributes: {
        favicon: StrapiMedia
      }
    }
  }
}

export default function App({ Component, pageProps }: AppStaticProps) {
  const { global } = pageProps

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(global.attributes.favicon)}
        />
      </Head>
      <GlobalContext.Provider value={global.attributes}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </>
  )
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
App.getInitialProps = async (ctx: AppContext) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await NextApp.getInitialProps(ctx)

  // Fetch global site settings from Strapi
  const globalRes = await fetchAPI('/global', {
    populate: {
      favicon: '*',
      defaultSeo: {
        populate: '*'
      }
    }
  })

  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data } }
}
