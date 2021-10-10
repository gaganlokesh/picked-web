import { ReactElement, useMemo } from 'react';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import SourceList from '../../components/SourceList';
import { useAuth } from '../../contexts/AuthContext';

function SourcesPage(): ReactElement {
  const { isReady, isLoggedIn } = useAuth();
  const tabs = useMemo<
    Array<{ label: string; shouldShow: boolean; endpoint: string }>
  >(
    () => [
      {
        label: 'All',
        shouldShow: true,
        endpoint: '/sources',
      },
      {
        label: 'Following',
        shouldShow: isLoggedIn,
        endpoint: '/sources/following',
      },
    ],
    [isLoggedIn]
  );

  return (
    <>
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="my-14">Sources</h1>
        <Tab.Group>
          <Tab.List className="mb-2 border-b border-neutral-light">
            {tabs.map(
              ({ shouldShow, label }) =>
                shouldShow && (
                  <Tab
                    className={({ selected }) =>
                      classNames('px-5 py-2', {
                        'text-neutral hover:text-neutral-dark': !selected,
                        'border-b-2 border-primary font-medium text-primary':
                          selected,
                      })
                    }
                  >
                    {label}
                  </Tab>
                )
            )}
          </Tab.List>
          <Tab.Panels>
            {tabs.map(
              ({ shouldShow, endpoint }) =>
                shouldShow && (
                  <Tab.Panel>
                    <SourceList requestEndpoint={isReady ? endpoint : null} />
                  </Tab.Panel>
                )
            )}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
}

export default SourcesPage;
