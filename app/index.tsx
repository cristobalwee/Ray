import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useReadingContext } from '@/components/ReadingProvider';

export default function Index() {
  const router = useRouter();
  const { onboarded } = useReadingContext();

  useEffect(() => {
    if (onboarded) {
      router.replace('/home');
    } else {
      router.replace('/onboarding');
    }
  }, [onboarded]);

  return null;
}