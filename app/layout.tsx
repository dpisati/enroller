import '@styles/globals.css';
import Image from 'next/image';
import SearchInput from './SearchInput';

import logo from '../public/logo.png';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="relative flex items-center justify-center h-12 my-4">
          <Image
            src={logo}
            alt="Enroller word with green underline"
            className="object-contain"
            fill
          />
        </div>

        <SearchInput />

        {children}
      </body>
    </html>
  );
}
