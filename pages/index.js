import { motion } from 'framer-motion'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

function Home() {
  return (
    <>
      <Head>
        <title>Styre</title>
        <meta name="description" content="Styre" />
      </Head>

      <header className="sticky top-0 left-0 right-0 shadow-md z-[99] bg-white">
        <div className="container">
          <div className="flex justify-between items-center py-2 md:py-3">
            <div className="relative h-12 w-[120px]">
              <Image src="/logo.png" alt="Styre logo" layout="fill" objectFit="cover" />
            </div>
            <div className="flex divide-x divide-gray-300">
              <div className="pr-4">
                <Link href="/sign-up">
                  <a
                    className="block px-[10px] h-[30px] text-[#38b6ff] font-bold leading-loose border 
                      border-solid border-[#38b6ff] hover:bg-[#38b6ff] hover:text-white transition-all duration-300 ease-linear"
                  >
                    Sign up
                  </a>
                </Link>
              </div>
              <div className="pl-4">
                <Link href="/sign-in">
                  <a
                    className="block px-[10px] h-[30px] text-[#38b6ff] font-bold leading-loose border 
                      border-solid border-[#38b6ff] hover:bg-[#38b6ff] hover:text-white transition-all duration-300 ease-linear"
                  >
                    Log in
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col justify-between items-center mt-20 md:mt-0 h-full min-h-[100vh]">
        <main className="relative flex items-center z-[1] flex-1 h-full">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-center items-center gap-y-[30px]">
              <div className="space-y-6 lg:space-y-10 w-full md:w-1/2">
                <motion.h1
                  className="text-[#38b6ff] font-bold leading-[1.2] text-center md:text-[50px] mb-0 md:text-left"
                  initial={{ visibility: 'hidden', opacity: 0, x: -200 }}
                  animate={{ visibility: 'visible', opacity: 1, x: 0 }}
                  transition={{ type: 'tween', duration: 1 }}
                >
                  Welcome to your professional project tracking.
                </motion.h1>
                <div className="space-y-6">
                  <motion.div
                    className="flex justify-between items-center p-4 text-lg leading-tight font-bold text-white border 
                      border-solid rounded-lg lg:max-w-md
                     bg-[rgba(56,182,255,0.8)] hover:shadow-[0px_4px_12px_rgba(0,0,0,0.3)]"
                    initial={{ visibility: 'hidden', opacity: 0, x: -200 }}
                    animate={{ visibility: 'visible', opacity: 1, x: 0 }}
                    transition={{ type: 'tween', duration: 1, delay: 1 }}
                  >
                    Manage Agile and Scrum teams
                  </motion.div>
                  <motion.div
                    className="flex justify-between items-center p-4 text-xl leading-tight font-bold text-white border 
                      border-solid rounded-lg lg:max-w-md bg-[rgba(56,182,255,0.8)] hover:shadow-[0px_4px_12px_rgba(0,0,0,0.3)]"
                    initial={{ visibility: 'hidden', opacity: 0, x: -200 }}
                    animate={{ visibility: 'visible', opacity: 1, x: 0 }}
                    transition={{ type: 'tween', duration: 1, delay: 2 }}
                  >
                    Organize your project tasks
                  </motion.div>
                  <motion.div
                    className="flex justify-between items-center p-4 text-xl leading-tight font-bold text-white border 
                      border-solid rounded-lg lg:max-w-md bg-[rgba(56,182,255,0.8)] hover:shadow-[0px_4px_12px_rgba(0,0,0,0.3)]"
                    initial={{ visibility: 'hidden', opacity: 0, x: -200 }}
                    animate={{ visibility: 'visible', opacity: 1, x: 0 }}
                    transition={{ type: 'tween', duration: 1, delay: 3 }}
                  >
                    Capture and record issues
                  </motion.div>
                </div>
              </div>
              <motion.div
                className="relative pt-[80%] md:pt-[50%] w-full md:w-1/2"
                initial={{ visibility: 'hidden', opacity: 0, x: 200 }}
                animate={{ visibility: 'visible', opacity: 1, x: 0 }}
                transition={{ type: 'tween', duration: 1 }}
              >
                <Image src="/good_team-removebg.png" alt="Good team png" layout="fill" objectFit="contain" priority />
              </motion.div>
            </div>
          </div>
        </main>
        <footer className="w-full py-2 bg-[#38b6ff]">
          <h4 className="text-center text-white">Copyright © 2022 Styre.</h4>
        </footer>
      </div>
    </>
  )
}

export default Home
