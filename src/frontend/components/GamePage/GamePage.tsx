import React, { useEffect } from 'react';
import { ProvideVillage, useVillage } from '../../hooks/useVillage';
import { GameHeader } from '../GameHeader/GameHeader';
import Loading from '../Loading/Loading';

export const GamePage = (props: React.PropsWithChildren<React.ReactNode>) => {
  const { loadVillage, isLoadingVillage } = useVillage();

  useEffect(() => {
    loadVillage();
  }, []);

  return (
    <main>
      {isLoadingVillage ? (
        <Loading />
      ) : (
        <div>
          <GameHeader />
          {props.children}
        </div>
      )}
    </main>
  );
};
