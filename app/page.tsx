import BaseSplit from './components/BaseSplit';
import FarcasterProvider from './provider/farecaster.provider';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <FarcasterProvider>
        <BaseSplit />
      </FarcasterProvider>
    </main>
  );
}