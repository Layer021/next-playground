'use client';

import { useEffect, useState } from 'react';

export default function ClientSideRenderer({children}: Readonly<{children: React.ReactNode}>) {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return children;
}
