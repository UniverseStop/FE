import React from 'react'

function CategoryBtn({emoticon, categoryTag} : {
  emoticon: string,
  categoryTag : string;
}) {
  return (
    <div className="flex flex-col items-center">
        <button className="hover">
            <div className="w-20 h-20 rounded-full border border-mainColor border-2 flex items-center justify-center">
               <p className="text-5xl">{emoticon}</p>
            </div>
        </button>
        <p className="mt-2 text-mainColor">{categoryTag}</p>
    </div>
  )
}

export default CategoryBtn