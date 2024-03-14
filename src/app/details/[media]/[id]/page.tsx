'use client'

import React, { useEffect, useState } from 'react'
import { query, url, Item } from '@/app/variables/Anilist';

type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  const [item, setItem] = useState<Item>();

  const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    body: JSON.stringify({
        query: query,
        variables: { id: params.id},
    }),
  };

  async function getData() {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setItem(jsonData.data.Page.media[0]);
        return jsonData.data.Page.media[0];
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    const getClearTime = setTimeout(getData, 200)
    return () => clearTimeout(getClearTime)
  }, []);

  useEffect(() => {
      console.log(item);
  }, [item]);


  return (
    <>
      {item ? (
        <div>
          <div className='flex flex-col justify-center items-center w-full'>
            <img src={item.bannerImage} alt="thumbnail" className='w-full'/>
            <div className='flex flex-row w-full p-5 px-48 bg-palette-one rounded-lg relative bottom-24'>
              <img src={item.coverImage.large} alt="thumbnail" className='rounded-lg '/>
              <div className='flex flex-col space-y-10 p-5 h-auto'>
                <h1 className='text-white text-2xl'>{item.title.romaji}</h1>
                <h1 className='text-white'>{item.description}</h1>
                <button className='rounded-lg bg-palette-three p-2'>Add</button>
              </div>
            </div>

            <div className='bg-palette-one'>
            </div>

          </div>
        </div>
        
      ) : (
        <div className='flex justify-center items-center'>Loading...</div>
      )}
    </>
  )
}
