export default function Input({
  label,
  helperText,
  error = false,
  state = 'default',
  variant = 'light',
  className = '',
  ...props
}) {
  const dark = variant === 'dark'
  const isFocusState = state === 'focus'
  const isDisabledState = state === 'disabled'

  const colorStyle = dark
    ? 'border-white/30 bg-white/10 text-white placeholder:text-primary-100 focus:border-white focus:ring-white/30 disabled:border-white/10 disabled:bg-white/5 disabled:text-primary-200'
    : 'border-neutral-200 bg-white text-neutral-900 placeholder:text-neutral-300 focus:border-primary-500 focus:ring-primary-100 disabled:border-neutral-100 disabled:bg-neutral-100 disabled:text-neutral-300'

  const forcedStateStyle = isFocusState
    ? dark
      ? 'border-white ring-4 ring-white/30'
      : 'border-primary-500 ring-4 ring-primary-100'
    : ''

  return (
    <label className={`block ${className}`}>
      <span className={`body-sm mb-2 block font-semibold ${dark ? 'text-white' : 'text-neutral-700'}`}>
        {label}
      </span>
      <input
        className={`body-md h-12 w-full rounded-xl border px-4 outline-none transition focus:ring-4 disabled:cursor-not-allowed ${colorStyle} ${forcedStateStyle} ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''}`}
        aria-invalid={error || undefined}
        disabled={props.disabled || isDisabledState}
        {...props}
      />
      {helperText && (
        <span className={`caption mt-2 block ${error ? 'text-red-600' : dark ? 'text-primary-100' : 'text-neutral-300'}`}>
          {helperText}
        </span>
      )}
    </label>
  )
}
