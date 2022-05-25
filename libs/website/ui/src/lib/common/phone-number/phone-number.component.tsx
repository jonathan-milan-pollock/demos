import Hyperlink from '../hyperlink/hyperlink.component';

interface Props {
  className?: string;
}

export default function PhoneNumber(props: Props): JSX.Element {
  return (
    <Hyperlink
      href="tel:404-992-3275"
      text="404.992.3275"
      className={props.className}
    />
  );
}
