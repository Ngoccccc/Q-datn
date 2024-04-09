import React from 'react'

export default function Conversation() {
    return (
        <div className='sticky'>
            <div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
                <div className='avatar online'>
                    <div className='w-12 rounded-full'>
                        <img src="" alt="" />
                    </div>


                </div>


                <div className='flex flex-col flex-1'>
                    <div className='hidden md:flex gap-3 justify-between'>
                        <p className='font-bold text-gray-200'>Quynhfldkfld </p>
                        <span className='text-x1'>😍</span>
                    </div>

                </div>


            </div>
        </div>
    )
}
