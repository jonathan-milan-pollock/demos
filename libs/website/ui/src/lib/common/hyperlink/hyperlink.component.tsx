import styles from './hyperlink.module.scss';

interface Props {
  href: string;
  text: string;
  className?: string;
}

export default function Hyperlink(props: Props): JSX.Element {
  let hyperlinkClassName = styles['hyperlink'];
  if (props.className) {
    hyperlinkClassName = `${styles['hyperlink']} ${props.className}`;
  }
  return (
    <a href={props.href} className={hyperlinkClassName} data-testid="hyperlink">
      {props.text}
    </a>
  );
}
