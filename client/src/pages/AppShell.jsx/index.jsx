/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  Bars3Icon,
  UsersIcon,
  XMarkIcon,
  ClipboardDocumentCheckIcon,
  MapIcon,
  UserGroupIcon,
  PresentationChartBarIcon,
  WrenchIcon,
  DocumentIcon,
  QuestionMarkCircleIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline'
import { Link, useNavigate  } from 'react-router-dom'
import Badge from '../../components/Text/Badge'
import useUserStore from '../../state/user'

const navigation = [
  {
    name: 'Overview',
    href: '/app/overview',
    icon: HomeIcon,
    isCurrent: () => (
      window.location.href.includes("/app/overview") ||
      window.location.href.includes("/app/abc")
    )
  },
  {
    name: 'abc',
    href: '/app/asdasd',
    icon: ClipboardDocumentCheckIcon,
    isCurrent: () => window.location.href.includes("/app/asdasd"),
  },
  {
    name: '123',
    href: '/app/123',
    icon: MapIcon,
    isCurrent: () => window.location.href.includes("/app/123"),
    isBeta: true,
  },
  {
    name: 'Feedback',
    href: '/app/feedback',
    icon: ChatBubbleBottomCenterTextIcon,
    isCurrent: () => window.location.href.includes("/app/feedback"),
  },
  { type: "divider", key: 1 },
  {
    name: 'Stats',
    href: '/app/stats',
    icon: PresentationChartBarIcon,
    isCurrent: () => window.location.href.includes("/app/stats")
  },
  {
    name: 'abc',
    href: '/app/abc',
    icon: UserGroupIcon,
    isCurrent: () => window.location.href.includes("/app/abc")
  },
  { type: "divider", key: 2 },
  {
    name: 'Settings',
    href: '/app/settings',
    icon: WrenchIcon,
    isCurrent: () => window.location.href.includes("/app/settings")
  },
  {
    name: 'Docs',
    href: 'https://example.com/docs/docs/getting-started',
    isExternal: true,
    icon: DocumentIcon,
    isCurrent: () => false
  },
  {
    name: 'Support',
    href: '/app/support',
    icon: QuestionMarkCircleIcon,
    isCurrent: () => window.location.href.includes("/app/support")
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AppShell({children, title}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigate = useNavigate()
  const user = useUserStore(s => s.user)
  const logout = useUserStore(s => s.logout)

  const onLogout = async () => {
    await logout()
    navigate("/app/login")
  }

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <Link to="/app/overview"><p className='text-primary text-3xl font-baloo2 font-semibold'>Example</p></Link>
                  </div>
                  <nav className="mt-5 px-2">
                    {navigation.map((item) => (
                      item.type === "divider" 
                        ? <div className='border-t-[1px] my-5 w-full' key={item.key}></div>
                        : item.isExternal
                          ? <a 
                              key={item.name}
                              href={item.href}
                              target="_blank"
                              className={classNames(
                                item.isCurrent()
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-transparent',
                                'group flex items-center px-2 py-2 text-base font-medium rounded-md my-1 border-l-4'
                              )}>
                              <item.icon
                                className={classNames(
                                  item.isCurrent() ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                  'mr-4 flex-shrink-0 h-6 w-6'
                                )}
                                aria-hidden="true"
                              />
                              {item.name} <ArrowTopRightOnSquareIcon width="14" className="ml-2" />
                            </a>
                          : <Link
                              key={item.name}
                              to={item.href}
                              className={classNames(
                                item.isCurrent()
                                  ? 'bg-blue-50 text-primary border-primary rounded-l-none'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-transparent',
                                'group flex items-center px-2 py-2 text-base font-medium rounded-md my-1 border-l-4'
                              )}
                            >
                              <item.icon
                                className={classNames(
                                  item.isCurrent() ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500',
                                  'mr-4 flex-shrink-0 h-6 w-6'
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                              {item.isBeta && <Badge type="beta" style={{fontSize: "10px", padding: "0px 8px", marginLeft: "6px"}}>Beta</Badge>}
                            </Link>
                    ))}
                  </nav>
                </div>
                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-base font-medium text-gray-700 hover:text-gray-900">{user?.name}</p>
                      <p onClick={onLogout} className="text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer">Log out</p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <Link to="/app/overview"><p className='text-primary text-3xl font-baloo2 font-semibold'>Example</p></Link>
              </div>
              <nav className="mt-5 flex-1 px-2 bg-white">
                {navigation.map((item) => (
                  item.type === "divider" 
                    ? <div className='border-t-[1px] my-5 w-full' key={item.key}></div>
                    : item.isExternal
                      ? <a 
                          key={item.name}
                          href={item.href}
                          target="_blank"
                          className={classNames(
                            item.isCurrent()
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-transparent',
                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md my-1 border-l-4'
                          )}>
                          <item.icon
                            className={classNames(
                              item.isCurrent() ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                              'mr-3 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden="true"
                          />
                          {item.name} <ArrowTopRightOnSquareIcon width="14" className="ml-2" />
                        </a>
                      : <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.isCurrent() ? 'bg-blue-50 text-primary border-primary rounded-l-none' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-transparent',
                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md my-1 border-l-4'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.isCurrent() ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500',
                              'mr-3 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                          {item.isBeta && <Badge type="beta" style={{fontSize: "10px", padding: "0px 8px", marginLeft: "6px"}}>Beta</Badge>}
                        </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4 w-full">
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 hover:text-gray-900">{user?.name}</p>
                  <p onClick={onLogout} className="text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer">Log out</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1 bg-gray-0 min-h-screen">
            <div className="py-6">
              <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8">
                {title}
              </div>
              <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-4">
                  {children}
                </div>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
