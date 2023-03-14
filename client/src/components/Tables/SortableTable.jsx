/* This example requires Tailwind CSS v2.0+ */
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'

export default function SortableTable({
  headers,
  rows,
  title,
  description,
  filters = null,
  actionText,
  actionOnClick,
  rowAction,
  rowActionOnClick,
  onSort,
  sortByKey,
  sortDirection,
}) {

  return (
    <div className="">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          {description && (
            <p className="mt-2 text-sm text-gray-800 max-w-4xl">
              {description}
            </p>
          )}
          {filters}
        </div>
        {actionText && (
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={actionOnClick}
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              {actionText}
            </button>
          </div>
        )}
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {headers.map((header, i) => {
                      const headerClass = i === 0
                        ? "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 cursor-pointer group"
                        : "px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer group"
                      return (
                        <th scope="col" className={headerClass} onClick={() => onSort(header.key)}>
                          <span className="inline-flex">
                            {header.title}
                            {header.sortable && (
                              <span
                                className={
                                  "ml-2 flex-none rounded text-gray-400"
                                  + (sortByKey === header.key ? " visible text-gray-600" : " invisible group-hover:visible group-focus:visible")
                                }
                              >
                                {sortDirection
                                  ? <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                                  : <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                }
                              </span>
                            )}
                          </span>
                        </th>
                      )
                    })}
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {rows.map((row) => (
                    <tr key={row.id}>
                      {row.values.map((value, i) => (
                        i === 0
                          ? <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {value}
                            </td>
                          : <td className="py-4 px-3 text-sm font-medium text-gray-900 max-w-[250px] overflow-x-auto">{value}</td>
                      ))}
                      {/*<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {row.values[0]}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.title}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit<span className="sr-only">, {person.name}</span>
                        </a>
                      </td>*/}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
