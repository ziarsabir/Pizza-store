import React from 'react'

function BlogItem({item}) {
  return (
    <div className="p-4 bg-gray-100 rounded shadow-md">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-600">{item.content}</p>
    </div>
  )
}

export default BlogItem

