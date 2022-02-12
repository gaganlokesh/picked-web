import { Dialog } from '@headlessui/react';
import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Article } from '../types/article';
import { reportArticle } from '../api/article';
import Button from './Button';
import IconTimes from '../public/icons/times.svg';
import IconCheck from '../public/icons/check-circle.svg';

interface ReportModalProps {
  article: Article;
  open: boolean;
  onClose: () => void;
}

const ArticleReportModal = ({
  article,
  open,
  onClose,
}: ReportModalProps): ReactElement => {
  const reportCategories = useMemo(
    (): { label: string; value: string }[] => [
      {
        label: 'Link or image is broken',
        value: 'bug',
      },
      {
        label: 'Spam',
        value: 'spam',
      },
      {
        label: 'Sexually explicit content',
        value: 'nsfw',
      },
      {
        label: 'Misleading content',
        value: 'misinformation',
      },
      {
        label: 'Other',
        value: 'other',
      },
    ],
    []
  );
  const initialInput = useMemo(
    () => ({
      category: reportCategories[0].value,
      reason: '',
    }),
    [reportCategories]
  );

  const [input, setInput] =
    useState<{ category: string; reason: string }>(initialInput);
  const [showMessageInput, setShowMessageInput] = useState<boolean>(false);
  const [isSubmitDisabled, setSubmitDisabled] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (input.category === 'other') {
      setShowMessageInput(true);
      input.reason?.length > 0
        ? setSubmitDisabled(false)
        : setSubmitDisabled(true);
    } else {
      setShowMessageInput(false);
      setSubmitDisabled(false);
    }
  }, [input]);

  const handleChange = (e: React.FormEvent<HTMLElement>): void => {
    const { name, value } = e.target as HTMLInputElement;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReportSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (isSubmitDisabled) return;

    reportArticle(article.id, input)
      .then(() => setSubmitted(true))
      .catch((err) => console.error(err));
  };

  const handleClose = (): void => {
    setSubmitted(false);
    setInput(initialInput);
    onClose();
  };

  return (
    <Dialog
      open={open}
      initialFocus={closeButtonRef}
      onClose={handleClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="min-h-screen text-center">
        <Dialog.Overlay className="fixed inset-0 bg-neutral-darkest opacity-30" />

        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div className="my-8 inline-block w-11/12 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all md:w-full">
          <button
            ref={closeButtonRef}
            className="absolute right-6 top-5 text-2xl text-neutral"
            onClick={handleClose}
          >
            <IconTimes className="ml-auto cursor-pointer" />
          </button>

          {!submitted ? (
            <>
              <Dialog.Title className="font-medium">Report</Dialog.Title>
              <form onSubmit={handleReportSubmit}>
                <div className="my-6 text-left text-lg md:mx-4">
                  <fieldset onChange={handleChange}>
                    {reportCategories.map((category, index) => (
                      <label
                        key={index}
                        className="my-3 flex cursor-pointer items-center"
                      >
                        <input
                          type="radio"
                          name="category"
                          value={category.value}
                          defaultChecked={input.category === category.value}
                          className="mr-3 cursor-pointer"
                        />
                        {category.label}
                      </label>
                    ))}
                  </fieldset>
                  {showMessageInput && (
                    <textarea
                      name="reason"
                      placeholder="Tell us more"
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-neutral-light shadow-sm transition focus:border-neutral focus:ring-1 focus:ring-neutral"
                      required
                    />
                  )}
                </div>
                <Button type="submit" disabled={isSubmitDisabled}>
                  Submit
                </Button>
              </form>
            </>
          ) : (
            <>
              <div className="my-5 text-7xl text-success-600">
                <IconCheck className="mx-auto" />
              </div>
              <Dialog.Title className="mx-auto my-2 w-3/4 font-medium">
                Thanks for your report!
              </Dialog.Title>
              <p className="my-2 text-center text-lg text-neutral-dark">
                We will review it as soon as possible.
              </p>
            </>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default ArticleReportModal;
