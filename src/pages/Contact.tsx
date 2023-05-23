import next from "next/types";
import { useState } from "react";
import axios from "axios";
import Header from "../component/Header";
import Footer from "@/component/Footer";
import { Button, Card, TextField } from "@mui/material";
import { Clear } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import styles from "@/styles/Contact.module.css";

const Contact = () => {
  //useState
  const ctt: string = "Contact";
  const [name, setName] = useState<String>("");
  const [mail, setMail] = useState<String>("");
  const [text, setText] = useState<String>("");
  //関数
  const sendMails = () => {
    const sendAgree = confirm("送信します、よろしいですか？");
    if (sendAgree == true) {
      axios
        .post("/api/sendMail", {
          mailName: name,
          mailFrom: mail,
          mailTxt: text,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      alert("送信しました");
      setName("");
      setMail("");
      setText("");
    } else {
    }
  };
  return (
    <>
      <Header />
      <div className={styles.contact}>
        <Card className={styles.form_card}>
          <h1 style={{ fontSize: "30px", textAlign: "center" }}>{ctt}</h1>
          <div className={styles.input_cmp}>
            <TextField
              className={styles.input_area}
              label="お名前"
              name="username"
              variant="outlined"
              autoComplete="off"
              style={{
                backgroundColor: "#00000010",
              }}
              value={name}
              inputProps={{}}
              InputProps={{
                endAdornment: (
                  <Button
                    className="crear"
                    sx={{
                      visibility: name ? "visible" : "hidden",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                    onClick={() => {
                      setName("");
                    }}
                  >
                    <Clear
                      sx={{
                        color: "#999",
                      }}
                    />
                  </Button>
                ),
              }}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              className={styles.input_area}
              label="メールアドレス"
              name="mails"
              variant="outlined"
              style={{
                backgroundColor: "#00000010",
              }}
              value={mail}
              inputProps={{}}
              InputProps={{
                endAdornment: (
                  <Button
                    className="crear"
                    sx={{
                      visibility: mail ? "visible" : "hidden",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                    onClick={() => {
                      setMail("");
                    }}
                    variant="text"
                    style={{
                      backgroundColor: "transparent",
                    }}
                  >
                    <Clear
                      sx={{
                        color: "#999",
                      }}
                    />
                  </Button>
                ),
              }}
              onChange={(e) => {
                setMail(e.target.value);
              }}
            />
            <TextField
              className={styles.input_area}
              label="お問い合わせ内容"
              name="content"
              multiline
              rows={3}
              variant="outlined"
              style={{
                backgroundColor: "#00000010",
              }}
              size="medium"
              onChange={(e) => setText(e.target.value)}
              value={text}
              InputProps={{
                endAdornment: (
                  <Button
                    className="crear"
                    sx={{
                      visibility: text ? "visible" : "hidden",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                    onClick={() => {
                      setText("");
                    }}
                    variant="text"
                    style={{
                      backgroundColor: "transparent",
                    }}
                  >
                    <Clear
                      sx={{
                        color: "#999",
                      }}
                    />
                  </Button>
                ),
              }}
            />
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              className={styles.send_btn}
              onClick={sendMails}
            >
              送信する
            </Button>
          </div>
        </Card>
      </div>
      <Footer />
    </>
  );
};
export default Contact;
