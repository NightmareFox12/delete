'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Funnel, Search } from 'lucide-react';
import { useAccount } from '~~/hooks/useAccount';

export const HeaderDaoList: React.FC = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) return;

    router.push('/');
  }, [isConnected, router]);

  return (
    <header className='border-b bg-base-100 border-secondary'>
      <div className='xl:container mx-auto px-6 py-1'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div>
            <h1 className='text-3xl text-center md:text-left font-bold text-balance'>
              Available DAOs
            </h1>
            <p className='text-center md:text-left text-muted-foreground mt-2 '>
              Discover and join decentralized autonomous organizations
            </p>
          </div>
          <div className='flex gap-4 mb-2 justify-center md:mb-0 md:justify-start'>
            <div className='relative w-full md:max-w-sm'>
              <div className='input bg-input text-accent flex items-center border-disabled bg-base-300 focus-within:border-none'>
                <Search className='h-4 w-4' />
                <input
                  type='search'
                  required
                  placeholder='Search'
                  className='input input-ghost focus-within:border-transparent focus:outline-hidden focus:bg-transparent h-[2.2rem] min-h-[2.2rem] px-4 border w-full text-xs placeholder:text-[#9596BF] text-neutral rounded-none'
                />
              </div>
            </div>

            <button className='btn btn-accent'>
              <Funnel className='h-4 w-4' />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
