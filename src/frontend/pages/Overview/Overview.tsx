import React from 'react';
import { GamePage } from '../../components/GamePage/GamePage';
import { useVillage } from '../../hooks/useVillage';

export const Overview = () => {
  const { village } = useVillage();

  return (
    <GamePage>
      <p>
        Wood:
        {village.resources.wood.quantity} | {village.resources.wood.maximum}
      </p>
      <p>
        clay:
        {village.resources.clay.quantity} | {village.resources.clay.maximum}
      </p>
      <p>
        iron:
        {village.resources.iron.quantity} | {village.resources.iron.maximum}
      </p>
      <p>
        Population:
        {village.resources.population.quantity} |{' '}
        {village.resources.population.maximum}
      </p>
    </GamePage>
  );
};
