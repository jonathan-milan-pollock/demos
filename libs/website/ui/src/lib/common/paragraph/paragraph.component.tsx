import styles from './paragraph.module.scss';

interface Props {
  text: string;
  className?: string;
}

export default function Paragraph(props: Props): JSX.Element {
  let paragraphClassName = styles['paragraph'];
  if (props.className) {
    paragraphClassName = `${styles['paragraph']} ${props.className}`;
  }
  return <p className={paragraphClassName}>{props.text}</p>;
}
