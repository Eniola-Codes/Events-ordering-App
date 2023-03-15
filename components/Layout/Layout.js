import React from 'react'
import Mainheader from './Mainheader'

const Layout = (props) => {
  return (
    <>
        <Mainheader />
        <main>{props.children}</main>
    </>
  )
}

export default Layout