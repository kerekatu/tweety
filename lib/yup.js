import * as yup from 'yup'

export const userSchema = yup.object().shape({
  email: yup.string().required('Email is required').email(),
  username: yup
    .string()
    .trim()
    .max(20, 'Username cannot be longer than 20 characters')
    .when('isUsernameRequired', (isUsernameRequired = false, schema) => {
      return isUsernameRequired
        ? schema
            .min(4, 'Username must be at least 4 characters long')
            .required('Username is required')
        : schema.notRequired()
    }),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
})

export const userSchemaWithUsername = yup.object().shape({
  email: yup.string().required('Email is required').email(),
  username: yup
    .string()
    .trim()
    .required('Username is required')
    .max(20, 'Username cannot be longer than 20 characters')
    .min(4, 'Username must be at least 4 characters long'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
})

export const postSchema = yup.object().shape({
  body: yup
    .string()
    .required('Text is required')
    .max(240, 'Text cannot be longer than 240 characters')
    .min(2, 'Text must be at least 3 characters long'),
})
