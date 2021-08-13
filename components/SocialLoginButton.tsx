import { ReactElement, ReactNode } from "react";

interface SocialLoginProps {
  icon: ReactNode;
  text: string;
  onClick: () => void;
}

const SocialLoginButton = ({ icon, text, onClick }: SocialLoginProps): ReactElement => {
  return (
    <button
      className="inline-flex py-3 px-4 m-1 border-2 rounded-md"
      onClick={onClick}
    >
      {icon}
      <span className="ml-4 font-medium">{text}</span>
    </button>
  )
}

export default SocialLoginButton;
