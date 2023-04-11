import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import Seo from '@/components/Seo'
import Layout from '@/components/Layout'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export default function Home() {
  return (
    <>
      <Layout>
        <Seo />
        <main className={styles.main}>
          <div className={styles.center}>
            <p className={inter.className}>CryptoChange works!</p>
          </div>
        </main>
      </Layout>
    </>
  )
}
