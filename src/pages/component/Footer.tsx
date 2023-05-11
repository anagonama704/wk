import next from "next/types";

const Footer = () => {
  const copy: string = "2023 ©︎ watanabe kei";

  return (
    <footer
      style={{
        width: "100%",
        height: "auto",
        padding: "40px 0 10px 0",
        backgroundColor: "#bbb",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <small style={{ fontSize: "10px" }}>{copy}</small>
    </footer>
  );
};

export default Footer;
