'use client'

import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { url, query, Item } from '../variables/Anilist';
import Link from 'next/link'

const Overlay = ({ onClose } : {onClose: () => void}) => {
    const [searchText, setSearchText] = useState('');
    const [items, setItems] = useState<Item[]>([]);
    const [searchVariables, setSearchVariables] = useState({
      type: 'ANIME',
    });

    const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
      },
      body: JSON.stringify({
          query: query,
          variables: {...searchVariables, search: searchText},
      }),
    }; 

    async function getData() {
      try {
          const response = await fetch(url, options);
  
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const jsonData = await response.json();
          setItems(jsonData.data.Page.media);
          return jsonData.data.Page.media;
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    }

    useEffect(() => {
      const getClearTime = setTimeout(getData, 1000)
      return () => clearTimeout(getClearTime)
    }, [searchText]);

    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col space-y-1 justify-center items-center">
        <div className='bg-white rounded-lg p-1 space-x-2 flex flex-row justify-center items-center'>
            <FaSearch/>
            <input type='input' list='dl' onChange={(e) => setSearchText(e.target.value)} className='rounded-lg outline-none' placeholder="Search"/>
            <button onClick={onClose}>
                <IoMdClose />
            </button>
        </div>
        {items.length != 0 && (
          <table className='w-1/6 h-2/4 bg-palette-four rounded-lg'>
            <tbody>
              {items.slice(0, 8).map((media) => {
                const id = media.id;
                const type = media.type.toLowerCase();
                const title = media.title.romaji;
                const thumbnailUrl = media.coverImage.medium;

                return (
                  <tr key={id} onClick={onClose} style={{ cursor: 'pointer'}}>
                    <td>
                      <img src={thumbnailUrl} alt="thumbnail" className='w-10 h-10 rounded-lg'/>
                    </td>
                    <td className='h-10'>
                      <Link href={`/details/${type}/${id}`}>
                        {title}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    );
  };

export default function CustomNavbar() {
    const [isSearching, setIsSearching] = useState(false);

    const toggleSearch = () => {
        setIsSearching(!isSearching);
    };

  return (
    <>
      <div className='absolute top-0 flex flex-row w-screen h-20 bg-palette-three p-5 items-center justify-center space-x-36'>
        <button className='rounded-lg bg-black h-12 w-12'>test</button>
        <div className='flex flex-row space-x-5 '>
            <a href=''>Home</a>
            <a href=''>Anime</a>
            <a href=''>Manga</a>
        </div>
        <div className='flex flex-row items-center space-x-5'>
            <button>
                <FaSearch onClick={toggleSearch}/>
            </button>
            <button className='rounded-lg bg-black h-12 w-12'>test</button>
        </div>
      </div>
      {isSearching && <Overlay onClose={toggleSearch}/>}
    </>
  )
}
