import React from 'react'
import Head from 'next/head'
import IssueList from '../../../components/Issue/IssueList'
import Header from '../../../components/Layout/Header'
import ProtectedRoute from '../../../components/ProtectedRoute'

function YourWorkPage() {
  return (
    <ProtectedRoute>
      <Head>
        <title>Your work - Styre</title>
      </Head>

      <Header />
      <main className="bg-white flex flex-col w-full h-[calc(100vh-56px)] pt-6 px-10">
        <div className="flex">
          <IssueList />
          <IssueList />
        </div>
      </main>
    </ProtectedRoute>
  )
}

export default YourWorkPage
