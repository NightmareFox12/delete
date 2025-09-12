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

//TODO: pedirle a V0 el apartado de tasks
//TODO: verificar en cada funcion que se llame que sea un usuario
//TODO: meterle el access de oppenzepelli para verificar si es auditor