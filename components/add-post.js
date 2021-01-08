import { useState, useEffect, useRef } from 'react'
import useOnClickOutside from '@/hooks/useOnClickOutside'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createAPost } from '@/lib/api'
import { postSchema } from '@/lib/yup'
import { mergeRefs } from '@/lib/helpers/mergeRefs'
import { mutate } from 'swr'
import { useRouter } from 'next/router'

const AddPost = ({ user, token }) => {
  const router = useRouter()
  const textAreaRef = useRef(null)
  const formRef = useRef(null)
  const [bodyText, setBodyText] = useState('')
  const [focusTextArea, setFocusTextArea] = useState(false)
  const [textAreaHeight, setTextAreaHeight] = useState('auto')
  const [errorMessage, setErrorMessage] = useState('')
  const { handleSubmit, register, errors, reset } = useForm({
    resolver: yupResolver(postSchema),
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage('')
    }, 3000)
    return () => clearTimeout(timer)
  }, [errorMessage])

  useEffect(() => {
    setTextAreaHeight(`${textAreaRef.current?.scrollHeight}px`)
  }, [bodyText])

  useOnClickOutside(formRef, () => {
    if (bodyText.length === 0) {
      setFocusTextArea(false)
    }
  })

  const handleHeightOnChange = (e) => {
    setTextAreaHeight('auto')
    setBodyText(e.target.value)
  }

  const handlePostForm = handleSubmit(async (data) => {
    setErrorMessage('')
    const response = await createAPost(token, user, data.body)

    if (!response?.success) {
      console.log(response)
      setErrorMessage('Something went wrong')
    } else {
      mutate(`/api/user/${router.query.user}`)
      reset(response)
      setBodyText('')
    }
  })

  return (
    <form
      className={`${
        focusTextArea && 'bg-gray-800'
      } relative flex flex-col px-6 py-4 border rounded-lg border-gray-800 focus-within:bg-gray-800 focus-within:border-gray-700 hover:border-gray-700 md:border-t-0 md:rounded-t-none`}
      ref={formRef}
      onSubmit={handlePostForm}
    >
      <textarea
        rows="1"
        className={`${
          !focusTextArea && 'text-center bg-gray-900'
        } block resize-none overflow-hidden w-full bg-gray-800 border-transparent text-gray-200 placeholder-gray-300 text-lg focus:bg-gray-800 focus:border-transparent focus:ring-0 disabled:opacity-30`}
        placeholder={
          focusTextArea ? 'Start typing...' : 'Wanna share a thought?'
        }
        name="body"
        id="body"
        title="Create a post"
        disabled={!token}
        maxLength={240}
        ref={mergeRefs(textAreaRef, register)}
        style={{ height: textAreaHeight }}
        onChange={handleHeightOnChange}
        onFocus={() => setFocusTextArea(true)}
      />
      <div
        className={
          focusTextArea ? 'flex gap-4 justify-end items-center' : 'hidden'
        }
      >
        {errorMessage || errors?.body ? (
          <span className="mr-auto text-sm text-red-500">
            * {errorMessage || errors?.body?.message}
          </span>
        ) : null}
        <div
          className={`${
            bodyText.length === 0
              ? 'hidden'
              : bodyText.length === 240 && 'text-red-500'
          } bottom-0 text-sm text-gray-400`}
          title={240 - bodyText.length + ' characters left'}
        >
          {bodyText.length}/240
        </div>
        <button
          className="bg-blue-600 px-6 py-1 rounded-full disabled:opacity-50 disabled:cursor-default hover:bg-blue-500 enabled:hover:bg-blue-600 transition-colors"
          disabled={bodyText.length >= 2 ? false : true}
        >
          Post
        </button>
      </div>
    </form>
  )
}

export default AddPost
