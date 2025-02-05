import { Link } from "react-router-dom"
import React, { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  ClipboardDocumentCheckIcon,
  ChatBubbleBottomCenterTextIcon,
  CursorArrowRaysIcon,
  MapIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { Button } from "../../components/Catalyst/button"

const features = [
  {
    name: 'Example Feature 1',
    description: 'example desc',
    href: '/example',
    icon: CursorArrowRaysIcon,
  },
  {
    name: 'Example Feature 2',
    description: 'abc',
    href: '/abc',
    icon: ClipboardDocumentCheckIcon,
  },
  /*{
    name: 'Automations',
    description: 'Build strategic funnels that will drive your customers to convert',
    href: '#',
    icon: ChartBarIcon,
  },
  {
    name: 'Reports',
    description: 'Get detailed reports that will help you make more informed decisions',
    href: '#',
    icon: ChartBarIcon,
  },*/
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function FlyoutMenu({name, sections}) {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? 'text-gray-900' : 'text-gray-500',
              'group rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none'
            )}
          >
            <span>{name}</span>
            <ChevronDownIcon
              className={classNames(
                open ? 'text-gray-600' : 'text-gray-400',
                'ml-2 h-5 w-5 group-hover:text-gray-500 transition ease-in-out duration-150'
              )}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0 lg:max-w-3xl">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                  {sections.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                    >
                      <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md text-primary-500 sm:h-12 sm:w-12">
                        <item.icon className="h-7 w-7" aria-hidden="true" />
                      </div>
                      <div className="ml-4">
                        <p className="text-base font-medium text-gray-900">{item.name}</p>
                        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                {/*<div className="p-5 bg-gray-50 sm:p-8">
                  <a
                    href="#"
                    className="-m-3 p-3 flow-root rounded-md hover:bg-gray-100 transition ease-in-out duration-150"
                  >
                    <span className="flex items-center">
                      <span className="text-base font-medium text-gray-900">Enterprise</span>
                      <span className="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-indigo-100 text-indigo-800">
                        New
                      </span>
                    </span>
                    <span className="mt-1 block text-sm text-gray-500">
                      Empower your entire team with even more advanced tools.
                    </span>
                  </a>
                </div>*/}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

const NAVIGATION = [
  //{ name: 'Features', isFlyout: true, },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Docs', href: '/docs', isActualLink: true },
  { name: 'Blog', href: '/blog', isActualLink: true },
  { name: 'About', href: '/about' },
]

const Header = () => {

  return (
    <Popover>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-1">
        <nav className="relative flex items-center justify-between sm:h-10 lg:justify-center" aria-label="Global">
          <div className="flex items-center flex-1 lg:absolute lg:inset-y-0 lg:left-0">
            <div className="flex items-center justify-between w-full lg:w-auto">
              <Link to="/">
                <p className='text-4xl font-semibold text-primary-500 example-logo-font'>Example</p>
              </Link>
              <div className="-mr-2 flex items-center lg:hidden">
                <Popover.Button className="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex lg:space-x-10">
            <FlyoutMenu name="Features" sections={features} />
            {NAVIGATION.map((item) => (
              item.isActualLink
                ? <a key={item.name} href={item.href} className="font-medium text-gray-500 hover:text-gray-900">
                    {item.name}
                  </a>
                : <Link key={item.name} to={item.href} className="font-medium text-gray-500 hover:text-gray-900">
                    {item.name}
                  </Link>
            ))}
          </div>
          <div className="hidden lg:absolute lg:flex lg:items-center lg:justify-end lg:inset-y-0 lg:right-0 gap-2">
            <Button color="blue" href="/app/login" outline>Log in</Button>
            <Button color="blue" href="/app/register">Get Started</Button>
          </div>
        </nav>
      </div>

      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden"
        >
          <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="px-5 pt-4 flex items-center justify-between">
              <div>
                <p className='text-4xl font-semibold text-primary-500 example-logo-font'>Example</p>
              </div>
              <div className="-mr-2">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Close main menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <span className="block px-3 py-2 text-gray-700 hover:text-gray-900">
                <FlyoutMenu name="Features" sections={features} />
              </span>
              {NAVIGATION.map((item) => (
                item.isActualLink
                ? <a key={item.name} href={item.href} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                    {item.name}
                  </a>
                : <Link
                    key={item.name}
                    to={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
              ))}
            </div>
            <Button color="blue" href="/app/login" outline>Log in</Button>
            <Button color="blue" href="/app/register">Get Started</Button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default Header