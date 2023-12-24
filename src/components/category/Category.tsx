import React from 'react'
import CategoryBtn from "./CategoryBtn"


function Category({title}: {title: string}) {
  return (
    <div>
        <p className="text-2xl font-bold m-6 0 6 6">{title}</p>
        <div className="flex justify-around">
        <CategoryBtn emoticon="🍰" categoryTag="맛집" />
        <CategoryBtn emoticon="🎬" categoryTag="문화" />
        <CategoryBtn emoticon="🏀" categoryTag="운동" />
        <CategoryBtn emoticon="📖" categoryTag="스터디" />
        <CategoryBtn emoticon="🎸" categoryTag="기타" />
        </div>
    </div>
  )
}

export default Category