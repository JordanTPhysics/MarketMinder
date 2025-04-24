"use client";

import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import { useReportWebVitals } from 'next/web-vitals'
import { Analytics } from "@vercel/analytics/react"
import Head from 'next/head';
import dynamic from 'next/dynamic';

import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/globals.css';

const UserProvider = dynamic(() => import('@auth0/nextjs-auth0/client').then(mod => mod.UserProvider), { ssr: false });

export default function MyApp({ Component, pageProps }: AppProps) {

  useReportWebVitals((metric) => {
    // console.log(metric)
  });

  return (
    <>
      <UserProvider user={pageProps.user}>
        <Head>
          <title>MarketMinder</title>
          <meta name="description" content="Data Analytics consulting Solutions - Hire Now" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='fullscreen-bg'></div>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </UserProvider>
    </>
  )
}