import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold">Catalog</div>
      <div className="space-x-4">
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded">
            <Link href="/">Home</Link>
        </button>
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded"><Link href="/Json">Json Examples</Link></button>
      </div>
    </div>
  )
}

export default NavBar
