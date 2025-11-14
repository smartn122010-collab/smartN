
import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconName: 'user' | 'bot' | 'send';
}

const Icon: React.FC<IconProps> = ({ iconName, ...props }) => {
  switch (iconName) {
    case 'user':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
        </svg>
      );
    case 'bot':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
          <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.997.056 1.95.228 2.857.547a.75.75 0 0 1 .429.832l-1.285 5.141a.75.75 0 0 1-.728.588l-2.182-.273a.75.75 0 0 0-.582.493l-.85 2.552a.75.75 0 0 1-1.299-.433l-.85-2.552a.75.75 0 0 0-.582-.493l-2.182.273a.75.75 0 0 1-.728-.588l-1.285-5.141a.75.75 0 0 1 .429-.832A49.712 49.712 0 0 1 9.344 3.071ZM15.838 14.062a.75.75 0 0 1 .863.442c.266.527.452 1.1.598 1.719l.17.678a.75.75 0 0 1-.417.846l-2.13.852a.75.75 0 0 1-.664-.022l-1.393-.81a.75.75 0 0 0-.863 0l-1.393.81a.75.75 0 0 1-.664.022l-2.13-.852a.75.75 0 0 1-.417-.846l.17-.678a4.99 4.99 0 0 1 .598-1.719.75.75 0 0 1 .863-.442l1.393.81a.75.75 0 0 0 .863 0l1.393-.81Z" clipRule="evenodd" />
        </svg>
      );
    case 'send':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
        </svg>
      );
    default:
      return null;
  }
};

export default Icon;
