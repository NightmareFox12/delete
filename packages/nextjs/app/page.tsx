'use server';

import Link from 'next/link';
import Image from 'next/image';
import { ConnectedAddress } from '~~/components/ConnectedAddress';
import { NextPage } from 'next';
import { Suspense } from 'react';
import { ParticlesBackground } from './_components/ParticleBackground';
import { Vote } from 'lucide-react';
import { CustomConnectButton } from '~~/components/scaffold-stark/CustomConnectButton';
import { HeroSection } from './_components/HeroSection';

const LandingPage: NextPage = async () => {
  return (
    <section className='min-h-screen relative scroll-smooth'>
      {/* Particles Background  */}
      <Suspense>
        <ParticlesBackground />
      </Suspense>

      {/* Header */}
      <header className='border-b z-30 border-primary'>
        <div className='mx-auto px-4 py-4 flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
              <Vote className='w-5 h-5 text-primary-foreground' />
            </div>
            <span className='hidden sm:block text-xl font-bold text-foreground'>
              AgoraDAO
            </span>
          </div>
          <nav className='hidden md:flex items-center space-x-6'>
            <a href='#features' className='text-accent-content'>
              Features
            </a>
            <a href='#how-it-works' className='text-accent-content'>
              How it works
            </a>
            {/* <a href="#rewards" className="text-accent-content">
                Recompensas
              </a> */}
          </nav>
          <div className='flex gap-1'>
            <CustomConnectButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />
    </section>
  );

  return (
    <div className='flex items-center flex-col grow pt-10'>
      <div className='px-5'>
        <h1 className='text-center'>
          <span className='block text-2xl mb-2'>Welcome to</span>
          <span className='block text-4xl font-bold'>Scaffold-Stark 2</span>
        </h1>
        <ConnectedAddress />
        <p className='text-center text-lg'>
          Edit your smart contract{' '}
          <code className='bg-underline italic text-base font-bold max-w-full break-words break-all inline-block'>
            YourContract.cairo
          </code>{' '}
          in{' '}
          <code className='bg-underline italic text-base font-bold max-w-full break-words break-all inline-block'>
            packages/snfoundry/contracts/src
          </code>
        </p>
      </div>

      <div className='bg-container grow w-full mt-16 px-8 py-12'>
        <div className='flex justify-center items-center gap-12 flex-col sm:flex-row'>
          <div className='flex flex-col bg-base-100 relative text-[12px] px-10 py-10 text-center items-center max-w-xs rounded-3xl border border-gradient'>
            <div className='trapeze'></div>
            <Image
              src='/debug-icon.svg'
              alt='icon'
              width={26}
              height={30}
            ></Image>
            <p>
              Tinker with your smart contract using the{' '}
              <Link href='/debug' passHref className='link'>
                Debug Contracts
              </Link>{' '}
              tab.
            </p>
          </div>
          <div className='flex flex-col bg-base-100 relative text-[12px] px-10 py-10 text-center items-center max-w-xs rounded-3xl border border-gradient'>
            <div className='trapeze'></div>
            <Image
              src='/explorer-icon.svg'
              alt='icon'
              width={20}
              height={32}
            ></Image>
            <p>
              Play around with Multiwrite transactions using
              useScaffoldMultiWrite() hook
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
