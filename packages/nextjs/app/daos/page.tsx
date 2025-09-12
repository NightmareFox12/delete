'use server';

import { NextPage } from 'next';
import { HeaderDaoList } from './_components/HeaderDaoList';
import { CustomConnectButton } from '~~/components/scaffold-stark/CustomConnectButton';
import { FaucetButton } from '~~/components/scaffold-stark/FaucetButton';
import { CreateDaoDialog } from './_components/CreateDaoDialog';
import { DaoGrid } from './_components/DaoGrid';

const DaosPage: NextPage = async () => {
  return (
    <section className='min-h-screen'>
      <HeaderDaoList />
      <div className='flex justify-center items-center mt-3'>
        <CustomConnectButton />
        <FaucetButton />
      </div>
      <CreateDaoDialog />
      <DaoGrid />
    </section>
  );
};

export default DaosPage;
