import dynamic from 'next/dynamic';

const NotesLayout = dynamic(() => import('../components/NotesLayout'), {
  ssr: false,
});

export default function HomePage() {
  return <NotesLayout />;
}

