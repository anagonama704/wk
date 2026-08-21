const Footer = () => {
  const year = new Date().getFullYear();

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
      <small style={{ fontSize: "10px" }}>
        {year} © watanabe kei
      </small>
    </footer>
  );
};

export default Footer;
