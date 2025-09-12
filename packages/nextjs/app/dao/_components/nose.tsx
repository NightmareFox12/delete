'use client';
import { useEffect } from 'react';
import { useHeaderStore } from '~~/services/store/header';

export const Nose: React.FC = () => {
  const { setShowHeader } = useHeaderStore();

  useEffect(() => {
    setShowHeader(true);
  }, [setShowHeader]);
  return <div></div>;
};
