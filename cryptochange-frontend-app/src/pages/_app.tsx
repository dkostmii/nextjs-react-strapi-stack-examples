import '@/styles/globals.css'
import NextApp from 'next/app'
import type { AppProps } from 'next/app'
import type { AppContext } from 'next/app'

import Head from 'next/head'

import { createContext } from 'react'
import { fetchAPI } from '../lib/api'
import { getStrapiMedia } from '../lib/media'

import { GlobalData, OptionalGlobalData } from '@/lib/apiInterfaces'

export const GlobalContext = createContext<OptionalGlobalData>({})

interface AppStaticProps extends AppProps {
  pageProps: {
    global?: {
      attributes: GlobalData
    }
    error?: string | {}
  }
}

export default function App({ Component, pageProps }: AppStaticProps) {
  if (pageProps.error) {
    const { error } = pageProps

    return (
      <>
        <div>
          <p>
            Error occurred:<span>{error.toString()}</span>
          </p>
        </div>
      </>
    )
  }

  if (!pageProps.global) {
    throw new TypeError('Expected pageProps.global to be defined.')
  }

  const { global } = pageProps

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(global.attributes.favicon)}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
  try {
    const globalRes = await fetchAPI('global', {
      populate: {
        favicon: '*',
        defaultSeo: {
          populate: '*'
        }
      }
    })

    // Pass the data to our page via props
    return { ...appProps, pageProps: { global: globalRes.data } }
  } catch (e) {
    if (!(e instanceof Error)) {
      throw new TypeError('Expected e to be Error.')
    }

    return { ...appProps, pageProps: { error: e.message } }
  }
}
