/* This example requires Tailwind CSS v2.0+ */
export default function CardWithGrayFooter({footer, body, containerClassName = ""}) {
  return (
    <div className={"bg-white overflow-hidden shadow rounded-lg " + containerClassName}>
      <div className="px-4 py-5 sm:p-6">{body}</div>
      <div className="bg-gray-50 px-3 py-3 sm:px-5">
        {footer}
      </div>
    </div>
  )
}
