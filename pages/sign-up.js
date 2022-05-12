import { useState, useRef } from 'react'
import { Form, Input, Result } from 'antd'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import ReCAPTCHA from 'react-google-recaptcha'
import { authService } from '../service/Auth.Service'
import { openErrorNotification } from '../shared/utils/notification'

function SignUp() {
  const recaptchaRef = useRef()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleFinish = async () => {
    try {
      if (loading) return

      setLoading(true)
      const values = await form.validateFields()
      const token = await recaptchaRef.current.executeAsync()
      values.token = token
      const data = await authService.register(values)
      setLoading(false)

      if (data && data.message !== 'SUCCESS') {
        openErrorNotification({ description: data.error })
      } else {
        setSuccess(true)
      }
    } catch (error) {
      // TO DO
    }
  }
  return (
    <>
      <Head>
        <title>Styre | Sign up</title>
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
        {!success ? (
          <main className="flex items-center justify-center">
            <div className="w-full bg-white md:w-[50vh] md:shadow-[0_4px_12px_#00000026] rounded-lg p-6">
              <h1 className="font-semibold text-2xl leading-[1.25] text-black/90 pb-1 mb-0">Sign up</h1>
              <Form form={form} onFinish={handleFinish} name="register-form" className="register-form mt-6">
                <Form.Item name="email" rules={[{ type: 'email', required: true, message: 'Invalid email' }]}>
                  <Input className="register-form__input" placeholder="Enter your email" />
                </Form.Item>
                <Form.Item name="firstName" rules={[{ required: true, message: 'This field is required' }]}>
                  <Input className="register-form__input" placeholder="Enter your first name" />
                </Form.Item>
                <Form.Item name="lastName" rules={[{ required: true, message: 'This field is required' }]}>
                  <Input className="register-form__input" placeholder="Enter your last name" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'This field is required' }]}>
                  <Input.Password
                    className="register-form__input"
                    placeholder="Enter your password"
                    autoComplete="on"
                  />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: 'Please confirm your password!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error('The two passwords that you entered do not match!'))
                      }
                    })
                  ]}
                >
                  <Input.Password className="register-form__input" placeholder="Confirm password" autoComplete="on" />
                </Form.Item>
                <ReCAPTCHA ref={recaptchaRef} size="invisible" sitekey="6Lcz4FcfAAAAADC_DXppnZtyKwn8a7UQbMBshYQR" />
                <button
                  type="submit"
                  className="block px-[10px] py-1 font-bold leading-loose border w-full
                  border-solid border-[#38b6ff] bg-[#38b6ff] text-white transition-all duration-300 ease-linear"
                >
                  Continue
                </button>
              </Form>
            </div>
          </main>
        ) : (
          <Result
            status="success"
            title="REGISTRATION SUCCESS"
            subTitle="Thank you. We have sent you an email. Please click the link in that email to active your account."
            extra={
              <Link href="/sign-in">
                <a
                  className="inline-block px-[10px] py-1 font-bold leading-loose border
                  border-solid border-[#38b6ff] bg-[#38b6ff] text-white hover:text-white transition-all duration-300 ease-linear"
                >
                  Continue
                </a>
              </Link>
            }
          />
        )}
        <footer className="w-full py-2 bg-[#38b6ff]">
          <h4 className="text-center text-white">Copyright © 2022 Styre.</h4>
        </footer>
      </div>
    </>
  )
}

export default SignUp
