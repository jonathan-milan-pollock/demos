import Hyperlink from '../hyperlink/hyperlink.component';

interface Props {
  className?: string;
}

export default function PhoneKeypadNumber(props: Props): JSX.Element {
  return (
    <Hyperlink
      href="tel:404-992-3275"
      text="404.992.DARK"
      className={props.className}
    />
  );
}
