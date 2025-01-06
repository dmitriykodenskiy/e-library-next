declare module 'react-read-more-read-less' {
  interface Props {
    charLimit: number;
    readMoreText: string;
    readLessText: string;
    readMoreClassName?: string;
    readLessClassName?: string;
    children: string;
  }

  export default function ReactReadMoreReadLess(props: Props): JSX.Element;
}
