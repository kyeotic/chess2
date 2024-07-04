import { mergeProps, splitProps, type ParentProps, type JSX } from 'solid-js'
import classNames from 'classnames'

interface ButtonProps
  extends ParentProps<JSX.ButtonHTMLAttributes<HTMLButtonElement>> {
  small?: boolean
  danger?: boolean
  secondary?: boolean
  class?: string
  extraClass?: string
  color?: keyof typeof BUTTON_COLORS
}

const BASE = 'font-bold rounded-lg text-white'
const MEDIUM = 'py-2 px-4'
const SMALL = 'py-0.5 px-3'
const DISABLED = 'opacity-50 cursor-not-allowed'

const COLOR_BASE = 'bg-teal-500 hover:bg-teal-700'
const COLOR_DANGER = 'bg-red-500 hover:bg-red-700'
const COLOR_SECONDARY = 'bg-gray-500 hover:bg-gray-700'

export const BUTTON_COLORS = {
  default:
    'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800',
  alt: 'py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700',
  green:
    'focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
  red: 'focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900',
  yellow:
    'focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900',
  purple:
    'focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900',
} as const

export default function Button(props: ButtonProps) {
  const [merged, rest] = splitProps(
    mergeProps(
      {
        class: BASE,
        type: 'button' as JSX.ButtonHTMLAttributes<HTMLButtonElement>['type'],
      },
      props
    ),
    [
      'class',
      'extraClass',
      'small',
      'danger',
      'secondary',
      'disabled',
      'onClick',
      'type',
      'color',
    ]
  )

  function style() {
    let result = classNames(
      merged.class,
      merged.extraClass,
      merged.small ? SMALL : MEDIUM,
      merged.danger
        ? COLOR_DANGER
        : merged.secondary
        ? COLOR_SECONDARY
        : COLOR_BASE,
      merged.disabled && DISABLED
    )

    if (merged.small) result = classNames(result, SMALL)
    else result = classNames(result, MEDIUM)

    if (merged.color) {
      result = classNames(result, BUTTON_COLORS[merged.color])
    } else {
      result = classNames(
        result,
        merged.danger
          ? COLOR_DANGER
          : merged.secondary
          ? COLOR_SECONDARY
          : COLOR_BASE
      )
    }

    return result
  }

  function onClick(e: Event) {
    if (merged.disabled) return
    // @ts-ignore
    props.onClick?.(e)
  }

  return (
    <button
      type={merged.type}
      class={style()}
      {...rest}
      onClick={props.onClick ? onClick : undefined}
    />
  )
}
