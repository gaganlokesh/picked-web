import { Menu } from '@headlessui/react';
import { ReactElement, ReactNode, useMemo } from 'react';
import { Article } from '../types/article';
import IconMenu from '../public/icons/ellipsis.svg';
import IconReport from '../public/icons/flag.svg';
import IconHidden from '../public/icons/eye-slash.svg';

interface ArticleAction {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

interface ActionMenuProps {
  article: Article;
  onReportClick: () => void;
  onHideClick: (id: number) => void;
}

const ArticleActionsMenu = ({
  article,
  onReportClick,
  onHideClick,
}: ActionMenuProps): ReactElement => {
  const actions = useMemo<ArticleAction[]>(
    () => [
      {
        icon: <IconHidden />,
        label: 'Hide story',
        onClick: () => onHideClick(article.id),
      },
      {
        icon: <IconReport />,
        label: 'Report',
        onClick: onReportClick,
      },
    ],
    [article, onReportClick, onHideClick]
  );

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="px-1">
          <IconMenu className="ml-2" />
        </Menu.Button>
        <Menu.Items className="absolute right-0 w-40 py-1 text-base origin-top-right bg-white rounded-md shadow-md ring-1 ring-neutral-light ring-opacity-5 focus:outline-none">
          {actions.map((action) => (
            <div
              key={action.label}
              className="px-1 py-1 hover:bg-neutral-lightest"
            >
              <Menu.Item>
                <button
                  className="flex items-center px-2"
                  onClick={action.onClick}
                >
                  <span className="mr-3 text-xl text-neutral-darkest">
                    {action.icon}
                  </span>
                  <span className="text-neutral-semidark">{action.label}</span>
                </button>
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </Menu>
    </>
  );
};

export default ArticleActionsMenu;
