import {
  PlusIcon
} from '@heroicons/react/24/outline'

export default function EmptyStateHorizontal({children, iconType = PlusIcon, iconWidth = 40, className = "", onClick}) {
  const Icon = iconType

  return (
    <button
      onClick={onClick}
      type="button"
      className={
        "border-2 border-gray-300 border-dashed rounded-lg p-4 flex text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        + className
      }
    >
      <Icon width={iconWidth} className="inline-block stroke-slate-500"  />
      <span className="block text-sm font-medium text-gray-900">{children}</span>
    </button>
  )
}
