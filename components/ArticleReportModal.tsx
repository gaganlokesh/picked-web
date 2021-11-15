import { Dialog } from '@headlessui/react';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
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
      onClose={handleClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="min-h-screen text-center">
        <Dialog.Overlay className="fixed inset-0 bg-neutral-darkest opacity-30" />

        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block w-11/12 max-w-md p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl md:w-full rounded-2xl">
          <button
            className="absolute text-2xl right-6 top-5 text-neutral"
            onClick={handleClose}
          >
            <IconTimes className="ml-auto cursor-pointer" />
          </button>

          {!submitted ? (
            <>
              <Dialog.Title className="font-medium">Report</Dialog.Title>
              <form onSubmit={handleReportSubmit}>
                <div className="my-6 text-lg text-left md:mx-4">
                  <fieldset onChange={handleChange}>
                    {reportCategories.map((category, index) => (
                      <label
                        key={index}
                        className="flex items-center my-3 cursor-pointer"
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
                      className="block w-full mt-1 transition rounded-md shadow-sm border-neutral-light focus:border-neutral focus:ring-1 focus:ring-neutral"
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
              <div className="my-5 text-success-600 text-7xl">
                <IconCheck className="mx-auto" />
              </div>
              <Dialog.Title className="w-3/4 mx-auto my-2 font-medium">
                Thanks for your report!
              </Dialog.Title>
              <p className="my-2 text-lg text-center text-neutral-dark">
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
