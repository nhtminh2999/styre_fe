import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useCurrentUser } from '../shared/hook/useCurrentUser'
import { Form, Input, Spin } from 'antd'
import { authService } from '../service/Auth.Service'
import { openErrorNotification } from '../shared/utils/notification'

function SignIn() {
  const router = useRouter()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const { data } = useCurrentUser()

  const handleFinish = async () => {
    try {
      if (loading) return

      setLoading(true)
      const values = await form.validateFields()
      const data = await authService.login(values)
      setLoading(false)

      if (data && data.message !== 'SUCCESS') openErrorNotification({ description: data.error })
      else router.push('/styre/your-work')
    } catch (error) {
      // TO DO
    }
  }

  if (data && data?.message === 'SUCCESS') router.replace('/styre/your-work')

  return (
    <>
      <Head>
        <title>Styre | Log in - Sign in</title>
      </Head>

      <div className="flex flex-col justify-between min-h-[100vh] bg-white">
        <header className="sticky top-0 left-0 right-0 shadow-md md:shadow-none z-[99] bg-white">
          <div className="container">
            <div className="flex justify-between items-center py-2 md:pt-8">
              <div className="relative h-12 w-[120px]">
                <Image src="/logo.png" alt="Styre logo" layout="fill" objectFit="cover" priority />
              </div>
            </div>
          </div>
        </header>

        <main className="flex items-center justify-center">
          <div className="w-full bg-white md:w-[50vh] md:shadow-[0_4px_12px_#00000026] rounded-lg p-6">
            <h1 className="font-semibold text-[32px] leading-[1.25] text-black/90 pb-1 mb-0">Sign in</h1>
            <p className="text-sm leading-[1.42857] font-normal text-black/90">Stay on your professional world</p>
            <Form form={form} onFinish={handleFinish} name="login-form" className="login-form mt-6">
              <Form.Item name="email" rules={[{ type: 'email', required: true, message: 'Invalid email' }]}>
                <Input className="login-form__input" placeholder="Enter your email" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: 'This field is required' }]}>
                <Input.Password className="login-form__input" placeholder="Enter your password" autoComplete="on" />
              </Form.Item>
              {loading ? (
                <div className="mx-auto text-center">
                  <Spin />
                </div>
              ) : (
                <button
                  type="submit"
                  className="block px-[10px] py-1 font-bold leading-loose border w-full
                  border-solid border-[#38b6ff] bg-[#38b6ff] text-white transition-all duration-300 ease-linear"
                >
                  Continue
                </button>
              )}
            </Form>
            <div className="flex flex-col sm:flex-row pt-4 mt-8 border-t border-solid border-[#d5d8de] justify-center items-center">
              <Link href="/forgot-password">
                <a className="text-[#0052cc] text-sm hover:underline hover:text-[#0052cc]">Can&apos;t log in?</a>
              </Link>
              <p className="px-2 mb-0">•</p>
              <Link href="/sign-up">
                <a className="text-[#0052cc] text-sm hover:underline hover:text-[#0052cc]">Sign up for an account</a>
              </Link>
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

export default SignIn
