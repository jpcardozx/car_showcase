'use client'

import React from 'react'
import { useState, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { CustomFilterProps } from '@/types'
import Image from 'next/image'
import { updateSearchParams } from '@/utils'

const CustomFilter = ({ title, options }: CustomFilterProps) => {
  const router = useRouter()

  const [selected, setSelected] = useState(options[0]);

  const handleUpdateParams = (e: { title: string, value: string }) => {

    const searchParams = new URLSearchParams(window.location.search);

    const newPathname = updateSearchParams(title, e.value.toLowerCase())

    router.push(newPathname, { scroll: false })

    const section = document.getElementById('discover');
    section?.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <div className='w-fit'>
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
          handleUpdateParams(e)
        }}
      >
        <div className='relative w-fit z-10'>
          <ListboxButton className='custom-filter__btn'>
            <span className='block truncate'>{selected.title}</span>
            <Image
              src='/chevron-up-down.svg'
              width={20}
              height={20}
              className='ml-4 object-contain'
              alt='chevron up down' />
          </ListboxButton>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <ListboxOptions className='custom-filter__options'>
              {options.map((option) => (
                <ListboxOption
                  key={option.value}
                  value={option}
                  className={({ active }) => `relative cursor-default select-none py-2 px-4 ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}`}>
                  {({ selected }) => (
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {option.title}
                    </span>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div >
  )
}

export default CustomFilter