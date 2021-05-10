import React, { createContext, ReactNode, useContext, useState, PropsWithChildren } from 'react';
import { createVillageResponse, VillageResponse } from '../../common/entities/village.entity';
import { makeAuthenticatedApiGetRequest } from '../utils/http';

interface VillageContextInterface {
  isLoadingVillage: boolean;
  village: VillageResponse;
  loadVillage: () => {};
}

const initialVillageContext: VillageContextInterface = {
  isLoadingVillage: true,
  village: createVillageResponse(''),
  loadVillage: async () => {},
};

const VillageContext = createContext(initialVillageContext);

export const useVillage = () => useContext(VillageContext);

export function ProvideVillage({ children }: PropsWithChildren<ReactNode>) {
  const [village, setVillage] = useState(createVillageResponse(''));
  const [isLoadingVillage, setIsLoadingVillage] = useState(true);

  const contextValue = {
    village,
    isLoadingVillage,
    loadVillage: async () => {
      setIsLoadingVillage(true);
      const response = await makeAuthenticatedApiGetRequest('village');
      setVillage(response);
      setIsLoadingVillage(false);
    },
  };

  return <VillageContext.Provider value={contextValue}>{children}</VillageContext.Provider>;
}
