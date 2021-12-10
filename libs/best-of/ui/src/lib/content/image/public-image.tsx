interface Props {
  readonly src: string;
  readonly alt: string;
  readonly title: string;
}

function Image(props: Props): JSX.Element {
  return (
    <section className="image-section">
      <img src={props.src} alt={props.alt} />
      <h1>{props.title}</h1>
    </section>
  );
}

export default Image;
