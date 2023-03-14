import {
  PlusIcon
} from '@heroicons/react/24/outline'

export default function EmptyState({children, iconType = PlusIcon, onClick}) {
  const Icon = iconType

  return (
    <button
      onClick={onClick}
      type="button"
      className="block border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <Icon width={40} className="inline-block stroke-slate-500"  />
      <span className="mt-2 block text-sm font-medium text-gray-900">{children}</span>
    </button>
  )
}
