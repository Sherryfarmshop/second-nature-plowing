import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Second Nature Plowing | Snow Removal in Livonia, MI',
  description: 'Professional snow plowing and removal services for residential and commercial properties in Livonia, MI and surrounding areas. Free quotes — call or text 734-756-6119.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
