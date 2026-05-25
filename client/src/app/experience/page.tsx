import React from 'react';
import Experience from '@/components/Experience';

export const metadata = {
  title: 'Experience | Muhammad Fahad',
  description: 'Work experience and internships of Muhammad Fahad — Full-Stack Developer & Flutter Specialist.',
};

export default function ExperiencePage() {
  return (
    <main className="flex min-h-screen flex-col bg-transparent pt-28">
      <Experience />
    </main>
  );
}
