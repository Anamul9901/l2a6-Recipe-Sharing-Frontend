'use client';

import * as React from 'react';
import { NextUIProvider } from '@nextui-org/system';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { Provider } from 'react-redux';
import { store } from '@/src/redux/store';
import { Toaster } from 'sonner';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <Provider store={store}>
      <Toaster />
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </Provider>
    </NextUIProvider>
  );
}
