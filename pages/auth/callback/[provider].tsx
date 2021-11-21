import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import LoadingBoxes from '../../../components/LoadingBoxes';
import { useAuth } from '../../../contexts/AuthContext';
import { getOAuthRedirectUri } from '../../../lib/auth';
import { OAuthProvider } from '../../../types/auth';

export default function AuthCallbackPage(): ReactElement {
  const { authenticate } = useAuth();
  const router = useRouter();
  const { provider, code } = router.query;

  useEffect(() => {
    if (provider && code) {
      authenticate(
        provider as OAuthProvider,
        code as string,
        getOAuthRedirectUri(provider as OAuthProvider)
      )
        .then(() => router.replace('/'))
        .catch(() => console.error('Failed to authenticate'));
    }
  }, [provider, code]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <LoadingBoxes />
        <h3 className="mt-12">Authenticating...</h3>
      </div>
    </div>
  );
}
