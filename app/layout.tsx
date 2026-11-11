import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Residential Snow Removal Livonia MI | Second Nature',
  description: 'Reliable residential snow plowing in Livonia, Michigan, and surrounding areas. Keep your driveway clear all winter. Call 734-756-6119 for a free quote.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
