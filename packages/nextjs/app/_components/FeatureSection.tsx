'use server';

import React from 'react';
import { LucideProps, Trophy, Vote, Zap } from 'lucide-react';

type Feature = {
  title: string;
  description: string;
  icon: React.FC<LucideProps>;
};

const mainFeatures: Feature[] = [
  {
    title: 'Transparent Voting',
    description:
      'Blockchain voting system that guarantees transparency and immutability in every decision.',
    icon: Vote,
  },
  {
    title: 'Gamified Tasks',
    description:
      'Complete missions, contribute to the ecosystem, and gain experience while helping the community.',
    icon: Zap,
  },
  {
    title: 'Rewards System',
    description:
      'Receive exclusive tokens and NFTs for your active participation in DAO governance',
    icon: Trophy,
  },
];

export const FeatureSection: React.FC = async () => {
  return (
    <section id='features' className='py-20 px-4 bg-card/30 relative z-10'>
      <div className='container mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-foreground mb-4'>
            Main Features
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Discover the tools that make AgoraDAO the leading platform in
            decentralized governance.
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-8'>
          {mainFeatures.map((x, y) => (
            <article key={y} className='card bg-base-100 shadow-sm'>
              <div className='card-body'>
                <div>
                  <div className='text-secondary flex justify-start p-2'>
                    <div className='bg-secondary/20 p-3 rounded-full'>
                      <x.icon />
                    </div>
                  </div>
                </div>
                <h2 className='card-title'>{x.title}</h2>
                <p>{x.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};