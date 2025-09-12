'use client';

import React from 'react';
import { Image, LogIn, Users } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useScaffoldWriteContract } from '~~/hooks/scaffold-stark/useScaffoldWriteContract';
import { useScaffoldReadContract } from '~~/hooks/scaffold-stark/useScaffoldReadContract';
import { DaoDetailsDialog } from './DaoDetailsDialog';

//constans
const darkCategoryColors = {
  defi: 'bg-blue-900 text-blue-300',
  gaming: 'bg-purple-900 text-purple-300',
  'Social Impact': 'bg-green-900 text-green-300',
  service: 'bg-orange-900 text-orange-300',
  energy: 'bg-yellow-900 text-yellow-300',
  governance: 'bg-pink-900 text-pink-300',
} as const;

const lightCategoryColors = {
  defi: 'bg-blue-100 text-blue-800',
  gaming: 'bg-purple-100 text-purple-800',
  'Social Impact': 'bg-green-100 text-green-800',
  service: 'bg-orange-100 text-orange-800',
  energy: 'bg-yellow-100 text-yellow-800',
  governance: 'bg-pink-100 text-pink-800',
} as const;

type DaoCardProps = {
  daoID: bigint;
  daoAddress: string;
  creatorAddress: string;
  userAddress: string;
  name: string;
  description: string;
  category: string;
  imageUri: string;
  creationDate: bigint;
};

export const DaoCard: React.FC<DaoCardProps> = ({
  daoID,
  daoAddress,
  creatorAddress,
  userAddress,
  name,
  description,
  category,
  imageUri,
  creationDate,
}) => {
  const { resolvedTheme } = useTheme();

  //consts
  const isDarkMode = (resolvedTheme ?? 'light') === 'dark';

  //smart contract
  const { sendAsync } = useScaffoldWriteContract({
    contractName: 'AgoraDao',
    functionName: 'join_dao',
    contractAddress: daoAddress,
  });

  const { data: userCounter, isLoading: userCounterLoading } =
    useScaffoldReadContract({
      contractName: 'AgoraDao',
      functionName: 'user_counter',
      contractAddress: daoAddress,
    });

  //functions
  const handleJoinDao = async () => {
    try {
      await sendAsync();
    } catch (err) {
      console.log(err);
    }
  };

  const CardHeader = () => {
    return (
      <article className='p-5 pb-0 mt-1'>
        <div className='w-full flex items-start justify-between'>
          <div className='flex items-center gap-3'>
            <div
              className={`rounded-lg bg-accent/50 ${imageUri.length > 4 ? '' : 'p-2'}`}
            >
              {imageUri.length > 4 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`https://ipfs.io/ipfs/${imageUri}`}
                  alt={name}
                  className='object-cover w-10 h-10 rounded-lg'
                />
              ) : (
                // eslint-disable-next-line jsx-a11y/alt-text
                <Image className='w-6 h-6' />
              )}
            </div>

            <div>
              <h2 className='card-title'>{name}</h2>
              <div className='flex items-center gap-1'>
                <Users className='h-4 w-4 text-muted-foreground' />
                {userCounter === undefined || userCounterLoading ? (
                  <div className='h-5 w-16 bg-accent skeleton' />
                ) : (
                  <span className='text-sm text-muted-foreground'>
                    {parseInt(`${userCounter}`)}{' '}
                    {BigInt(`${userCounter}`) > 1n ? 'users' : 'user'}
                  </span>
                )}
              </div>
            </div>
          </div>
          <span className='badge badge-accent font-semibold text-[12px]'>
            #{daoID}
          </span>
        </div>

        {/* Category Badge */}
        <span
          className={`w-fit mt-2 badge text-[12px] font-semibold ${
            isDarkMode
              ? darkCategoryColors[
                  category.toLowerCase() as keyof typeof darkCategoryColors
                ]
              : lightCategoryColors[
                  category.toLowerCase() as keyof typeof lightCategoryColors
                ]
          }`}
        >
          {category.toLowerCase()}
        </span>
      </article>
    );
  };

  return (
    <div className={`${creatorAddress === userAddress ? "bg-accent/50 border border-gradient" : "bg-base-100"} card w-full shadow-sm`}>
      <CardHeader />
      <div className='card-body pt-3'>
        <p className='mt-0 break-all text-sm leading-relaxed'>
          {description.length > 200
            ? description.slice(0, 200) + '...'
            : description}
        </p>
        <div className='card-actions'>
          {creatorAddress === userAddress ? (
            <button className='btn btn-soft btn-neutral flex-1'>
              <LogIn className='h-4 w-4' />
              Log In
            </button>
          ) : (
            <button
              onClick={handleJoinDao}
              disabled={creatorAddress === userAddress}
              className='btn flex-1 btn-accent'
            >
              Join DAO
            </button>
          )}
          <DaoDetailsDialog
            daoID={daoID}
            daoAddress={daoAddress}
            name={name}
            description={description}
            imageUri={imageUri}
            creationDate={creationDate}
          />
        </div>
      </div>
    </div>
  );
};
