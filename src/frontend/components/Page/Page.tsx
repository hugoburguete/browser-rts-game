import React, { PropsWithChildren, ReactNode } from 'react';
import { Header } from '../Header/Header';

export const Page = (props: PropsWithChildren<ReactNode>) => {
  return (
    <div>
      <Header />
      <main id="main">{props.children}</main>
    </div>
  );
};
