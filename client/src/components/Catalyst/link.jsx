import * as Headless from '@headlessui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import React, { forwardRef } from 'react'

export const Link = forwardRef(function Link(props, ref) {
  return (
    <Headless.DataInteractive>
      <ReactRouterLink {...props} to={props.href} ref={ref} />
    </Headless.DataInteractive>
  )
})
