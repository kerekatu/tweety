import { useState, useEffect } from 'react'
import Layout from '@/containers/layout'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, FormInput } from '@/components/common/form/form'
import { userSchemaWithUsername } from '@/lib/yup'
import { useRouter } from 'next/router'
import { getAuthCookie } from '@/lib/auth'

export async function getServerSideProps(ctx) {
  const token = getAuthCookie(ctx.req)

  return {
    props: {
      token: token || null,
    },
  }
}

const SignUp = ({ token }) => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(userSchemaWithUsername),
  })

  useEffect(() => {
    if (token) {
      router.replace('/')
    }
  }, [router, token])

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage('')
    }, 3000)
    return () => clearTimeout(timer)
  }, [errorMessage])

  const handleLoginForm = handleSubmit(async (data) => {
    if (errorMessage?.message) setErrorMessage('')

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        router.push('/')
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      setErrorMessage(JSON.parse(error.message))
    }
  })

  return (
    <Layout>
      <div className="flex items-center content-center mt-24 mx-auto w-full lg:w-3/5">
        <div className="bg-gray-800 px-12 py-16 w-full shadow-xl rounded-md">
          <h2 className="text-3xl font-bold mb-8 text-center">Sign Up</h2>
          <Form
            submitText="Sign Up"
            onSubmit={handleLoginForm}
            error={errorMessage}
          >
            <FormInput
              label="Email"
              name="email"
              placeholder="example@example.com"
              register={register}
              error={errors?.email}
            />
            <FormInput
              label="Username (min. 4)"
              name="username"
              placeholder="Username"
              register={register}
              error={errors?.username}
            />
            <FormInput
              type="password"
              label="Password (min. 8)"
              name="password"
              placeholder="Password"
              register={register}
              error={errors?.password}
            />
          </Form>
        </div>
      </div>
    </Layout>
  )
}

export default SignUp
