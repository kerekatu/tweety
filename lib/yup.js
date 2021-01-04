import * as yup from 'yup'

export const userSchema = yup.object().shape({
  email: yup.string().required('email is required').email(),
  username: yup
    .string()
    .trim()
    .min(4, 'username must be at least 4 characters long')
    .max(20, 'username cannot be longer than 20 characters')
    .when('isUsernameRequired', (isUsernameRequired = false, schema) => {
      return isUsernameRequired
        ? schema.required('username is required')
        : schema.notRequired()
    }),
  password: yup
    .string()
    .required('password is required')
    .min(8, 'password must be at least 8 characters long'),
})
