import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SideBar from '../Components/SideBar'
import Header from '../Components/Header'
import Content from '../Components/Content'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Intervenciones Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideBar />
      <Header />
      <Content />

      {/* <footer className={styles.footer}>
        <p>
          Creado por Rebeca y Laura Kamila
        </p>
      </footer> */}
    </div>
  )
}
