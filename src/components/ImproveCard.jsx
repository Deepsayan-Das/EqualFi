import React from 'react'

function ImproveCard(props) {
  return (
    <div className='h-[60%] aspect-4/5 rounded-2xl bg-[linear-gradient(to_right,rgba(120,160,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,160,255,0.07)_1px,transparent_1px)] flex flex-col justify-evenly items-start border border-indigo-300'>
        <h1 className='text-4xl font-extrabold text-white capitalize ml-6'>
            {props.title}
        </h1>
        <p className='text-md font-thin text-white ml-6 italic'>
            {props.desc}

        </p>
        <ul className='ml-6 text-white' >
            <li className='flex items-center justify-start gap-2 text-left'><div className='h-2 aspect-square bg-yellow-500 rounded-full'/>{props.line1}</li>
            <li className='flex items-center justify-start gap-2'><div className='h-2 aspect-square bg-yellow-500 rounded-full'/>{props.line2}</li>
            <li className='flex items-center justify-start gap-2'><div className='h-2 aspect-square bg-yellow-500 rounded-full'/>{props.line3}</li>
           
        </ul>
        <p className='text-md font-thin text-white ml-6 italic'>
           {props.effect} 

        </p>

    </div>
  )
}

export default ImproveCard