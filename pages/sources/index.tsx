import { ReactElement } from 'react';
import SourceList from '../../components/SourceList';
import { useAuth } from '../../contexts/AuthContext';

function SourcesPage(): ReactElement {
  const { isReady } = useAuth();
  const requestEndpoint = isReady ? '/sources' : null;

  return (
    <>
      <div className="grid grid-cols-12 gap-x-5">
        <div className="col-span-6 col-start-4">
          <h1 className="my-14">Sources</h1>
          <SourceList requestEndpoint={requestEndpoint} />
        </div>
      </div>
    </>
  );
}

export default SourcesPage;
