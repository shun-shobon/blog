import { h, FunctionComponent } from "preact";

type Props = {
  name: string
};

const Hello: FunctionComponent<Props> = ({ name }) => {
  return (
    <h1>{`Hello, ${name}`}</h1>
  );
};

export default Hello;
