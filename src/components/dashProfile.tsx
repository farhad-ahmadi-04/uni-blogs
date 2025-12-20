'use client';

import { useTheme } from '@/hooks/useContext';
import { UserProfile } from '@clerk/nextjs';
import { dark, experimental__simple } from '@clerk/themes';

export default function DashProfile() {
  const { isDark } = useTheme();
  return (
    <section className='flex justify-center items-center w-full'>
      <UserProfile
        appearance={{
          baseTheme: isDark ? dark : experimental__simple,
        }}
        routing='hash'
      />
    </section>
  );
}