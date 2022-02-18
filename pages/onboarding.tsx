import { useRouter } from 'next/router';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import { useAuth } from '../contexts/AuthContext';
import { updateUser, validateUsername } from '../api/user';
import Button from '../components/Button';
import Input from '../components/Input';
import Spinner from '../public/icons/spinner.svg';

const Onboarding = (): ReactElement => {
  const initialInput = useMemo(
    () => ({
      name: '',
      username: '',
    }),
    []
  );

  const router = useRouter();
  const { isReady, isLoggedIn, user, refreshUser } = useAuth();
  const [input, setInput] =
    useState<{ name: string; username: string }>(initialInput);
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    username?: string;
  }>({});
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);

  const debounceValidateUsername = useMemo(() => {
    return debounce((value) => {
      validateUsername(value)
        .then((res) => {
          if (res.valid) {
            setFormErrors(({ username, ...rest }) => ({ ...rest }));
          } else {
            setFormErrors((errors) => ({ ...errors, username: res.message }));
          }
        })
        .catch(console.error);
    }, 500);
  }, [setFormErrors]);

  useEffect(() => {
    return () => {
      debounceValidateUsername.cancel();
    };
  }, [debounceValidateUsername]);

  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'name':
        if (value.length === 0) {
          setFormErrors((errors) => ({
            ...errors,
            name: "Name can't be blank",
          }));
        } else {
          setFormErrors(({ name, ...rest }) => ({ ...rest }));
        }
        break;

      case 'username':
        if (value.length === 0) {
          setFormErrors((errors) => ({
            ...errors,
            username: "Username can't be blank",
          }));
        }
        break;

      default:
        break;
    }
  };

  const validateAllFields = () => {
    Object.keys(input).forEach((field) => {
      if (formErrors[field]) return;

      validateField(field, input[field]);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });

    validateField(name, value);

    if (name === 'username' && value.length > 0) {
      debounceValidateUsername(value);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    validateAllFields();
    if (Object.keys(formErrors).length > 0) return;

    setFormSubmitting(true);

    updateUser(user.id, input)
      .then(() => {
        refreshUser();
        router.replace('/');
      })
      .catch(console.error)
      .finally(() => {
        setFormSubmitting(false);
      });
  };

  if (!isReady || (isReady && !isLoggedIn)) return <></>;

  if (isReady && isLoggedIn && false) {
    router.replace('/');
    return <></>;
  }

  return (
    <>
      <div className="mx-auto flex min-h-screen w-4/5 flex-col justify-center md:w-2/4 lg:w-1/4">
        <h1>👋</h1>
        <h2 className="mt-2">Hi, there!</h2>
        <div className="mt-2 text-lg">
          Let&lsquo;s update your info and get you started
        </div>
        <form className="mt-7" onSubmit={handleFormSubmit}>
          <label className="flex flex-col text-sm font-medium">
            Name
            <Input
              type="text"
              name="name"
              className="mt-2"
              autoComplete="off"
              placeholder="Name"
              onChange={handleInputChange}
              isInvalid={!!formErrors?.name}
            />
          </label>
          {formErrors?.name && (
            <div className="mt-1 text-xs text-danger">{formErrors.name}</div>
          )}
          <label className="mt-5 flex flex-col text-sm font-medium">
            Username
            <Input
              type="text"
              name="username"
              className="mt-2"
              autoComplete="off"
              placeholder="@username"
              onChange={handleInputChange}
              isInvalid={!!formErrors?.username}
            />
          </label>
          {formErrors?.username && (
            <div className="mt-1 text-xs text-danger">
              {formErrors.username}
            </div>
          )}
          <Button className="mt-10 flex items-center" disabled={formSubmitting}>
            Get started
            {formSubmitting && (
              <Spinner className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default Onboarding;
