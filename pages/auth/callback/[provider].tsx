import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import LoadingBoxes from '../../../components/LoadingBoxes';
import { useAuth } from '../../../contexts/AuthContext';
import { getOAuthRedirectUri } from '../../../lib/auth';
import { OAuthProvider } from '../../../types/auth';

export default function AuthCallbackPage(): ReactElement {
  const { authenticate } = useAuth();
  const router = useRouter();
  const params = router.query;

  useEffect(() => {
    if (params) {
      // Redirect to home page if user denies authorization
      if (params?.denied) {
        router.replace('/');
      }

      const provider = params?.provider as OAuthProvider;

      authenticate(provider, params, getOAuthRedirectUri(provider))
        .then(() => router.replace('/'))
        .catch(() => console.error('Failed to authenticate'));
    }
  }, [params]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <LoadingBoxes />
        <h3 className="mt-12">Authenticating...</h3>
      </div>
    </div>
  );
}
