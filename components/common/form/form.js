export const Form = ({ children, submitText, error, ...props }) => {
  return (
    <form className="flex flex-col gap-8 w-full" {...props}>
      {children}

      {error && (
        <span role="alert" className="text-red-500 mt-2 text-sm">
          * {error.message}
        </span>
      )}

      <input
        type="submit"
        value={submitText}
        className="self-start px-12 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors"
      />
    </form>
  )
}

export const FormInput = ({
  label,
  register,
  name,
  type = 'text',
  error,
  ...props
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-2">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className={
          error
            ? 'focus:ring-inset border-red-500 bg-gray-900 rounded-lg'
            : 'border-gray-600 bg-gray-900 rounded-lg'
        }
        ref={register}
        {...props}
      />
      {error && (
        <span role="alert" className="text-red-500 mt-2 text-sm">
          * {error.message}
        </span>
      )}
    </div>
  )
}
