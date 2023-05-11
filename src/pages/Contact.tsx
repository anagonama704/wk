import next from "next/types";
import Header from "./component/Header";

const Contact = () => {
  const ctt: string = "contacts";

  return (
    <div>
      <Header />
      <h1>{ctt}</h1>
    </div>
  );
};
export default Contact;
