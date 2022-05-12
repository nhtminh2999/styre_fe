import 'antd/dist/antd.css'
import '../styles/globals.css'
import { useState } from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

function MyApp({ Component, pageProps, router }) {
  const [queryClient] = useState(() => new QueryClient())
  const getLayout = Component.getLayout || (page => page)
  return (
    <QueryClientProvider client={queryClient}>
      {getLayout(<Component {...pageProps} key={router.route} />)}
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  )
}

export default MyApp
