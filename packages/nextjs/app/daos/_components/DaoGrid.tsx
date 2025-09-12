'use client';

import { useScaffoldReadContract } from '~~/hooks/scaffold-stark/useScaffoldReadContract';
import { Frown, X } from 'lucide-react';
import { IDao } from '~~/types/dao';
import React, { JSX, useMemo } from 'react';
import { DaoCard } from './DaoCard';
import { num } from 'starknet';
import { useCategorySelected } from '~~/services/store/categorySelected';
import { useAccount } from '~~/hooks/useAccount';

export const DaoGrid: React.FC = () => {
  const { category } = useCategorySelected();
  const { address } = useAccount();

  //smart contract
  const { data: publicDaos, isLoading: daoLoading } = useScaffoldReadContract({
    contractName: 'AgoraDaoFabric',
    functionName: 'get_public_daos',
  });

  //memos
  const filterDaos = useMemo(() => {
    if (address === undefined) return [];

    switch (category) {
      case '':
        return publicDaos;
      case 'my-dao':
        return (
          publicDaos?.filter(
            (x: any) =>
              num.toHex(x.creator) === num.cleanHex(address.toString())
          ) ?? []
        );
      default:
        return (
          publicDaos?.filter((x: any) => x.category.toString() === category) ??
          []
        );
    }
  }, [address, category, publicDaos]);

  //components
  const LoadingCards = (): JSX.Element => {
    return (
      <article className='w-full grid gap-6 sm:grid-cols-2 md:grid-cols-3 px-4 sm:mt-4 mb-2 sm:mb-4'>
        {Array(9)
          .fill(0)
          .map((_x, y) => (
            <div key={y} className='skeleton bg-primary h-56 w-full' />
          ))}
      </article>
    );
  };

  return (
    <section>
      {filterDaos === undefined || daoLoading ? (
        <LoadingCards />
      ) : filterDaos.length === 0 ? (
        <article className='h-96 mt-5 flex justify-center flex-col text-center py-12'>
          <Frown className='h-20 w-20 text-muted-foreground mx-auto mb-4' />
          <h3 className='text-2xl font-semibold mb-2'>No DAOs are available</h3>
          <p className='text-muted-foreground'>
            Please check back later to see new organizations available.
          </p>
        </article>
      ) : (
        <article className='container px-2 sm:px-2 md:max-w-6xl mx-auto py-8'>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {filterDaos.map((dao) => {
              const x = dao as unknown as IDao;

              return (
                <DaoCard
                  key={x.dao_ID}
                  daoID={x.dao_ID}
                  daoAddress={num.toHex(x.dao_address)}
                  name={x.name}
                  description={x.description}
                  category={x.category}
                  imageUri={x.image_URI}
                  creationDate={x.creation_timestamp}
                />
              );
            })}
          </div>
        </article>
      )}
    </section>
  );
};
