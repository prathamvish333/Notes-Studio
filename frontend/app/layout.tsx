import './globals.css';
import { Metadata } from 'next';
import ClientLayout from '../components/ClientLayout';
import Providers from '../components/Providers';

export const metadata: Metadata = {
  title: 'Pratham Vishwakarma | Backend & DevOps Engineer',
  description: 'Backend and DevOps Engineer at Jio Platforms. Building automation systems, FastAPI microservices, and Kubernetes-based infrastructure. Python, Docker, CI/CD.',
  keywords: ['Pratham Vishwakarma', 'Backend Engineer', 'DevOps Engineer', 'SDE-1', 'Jio Platforms', 'FastAPI', 'Python', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'Portfolio'],
  authors: [{ name: 'Pratham Vishwakarma' }],
  openGraph: {
    title: 'Pratham Vishwakarma | Backend & DevOps Engineer',
    description: 'SDE-1 at Jio Platforms. Python, FastAPI, Docker, Kubernetes, Jenkins, Terraform.',
    url: 'https://prathamvishwakarma.com',
    siteName: "Pratham Vishwakarma",
    images: [
      {
        url: '/favicon.png',
        width: 512,
        height: 512,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-terminal-text antialiased">
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
