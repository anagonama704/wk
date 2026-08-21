import { FormEvent, useState } from "react";
import Header from "../component/Header";
import Footer from "@/component/Footer";
import {
  Alert,
  Button,
  Card,
  CircularProgress,
  TextField,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import styles from "@/styles/Contact.module.css";
import Heads from "@/component/Heads";

type SubmitStatus = "idle" | "loading" | "success" | "error";

const Contact = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const sendMails = async (event: FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !mail.trim() || !text.trim()) {
      setStatus("error");
      setErrorMessage("すべての項目を入力してください。");
      return;
    }

    const sendAgree = confirm("送信します、よろしいですか？");
    if (!sendAgree) {
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mailName: name,
          mailFrom: mail,
          mailTxt: text,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error ?? "送信に失敗しました");
      }

      setStatus("success");
      setName("");
      setMail("");
      setText("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "送信に失敗しました"
      );
    }
  };

  return (
    <>
      <Heads
        title="Contact | WK-portfolio"
        description="渡辺慧へのお問い合わせフォーム。"
      />
      <Header />
      <div className={styles.contact}>
        <Card className={styles.form_card} component="form" onSubmit={sendMails}>
          <h1 style={{ fontSize: "30px", textAlign: "center" }}>Contact</h1>

          {status === "success" && (
            <Alert severity="success" sx={{ mt: 2 }}>
              送信しました。ご連絡ありがとうございます。
            </Alert>
          )}
          {status === "error" && errorMessage && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <div className={styles.input_cmp}>
            <TextField
              className={styles.input_area}
              label="お名前"
              name="username"
              variant="outlined"
              autoComplete="name"
              required
              style={{
                backgroundColor: "#00000010",
                width: "100%",
                height: "auto",
                margin: "30px 0 0 0",
              }}
              value={name}
              InputProps={{
                endAdornment: (
                  <Button
                    sx={{
                      visibility: name ? "visible" : "hidden",
                      "&:hover": { backgroundColor: "transparent" },
                    }}
                    onClick={() => setName("")}
                    aria-label="お名前をクリア"
                  >
                    <Clear sx={{ color: "#999" }} />
                  </Button>
                ),
              }}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              className={styles.input_area}
              label="メールアドレス"
              name="mails"
              type="email"
              variant="outlined"
              autoComplete="email"
              required
              style={{
                backgroundColor: "#00000010",
                width: "100%",
                height: "auto",
                margin: "30px 0 0 0",
              }}
              value={mail}
              InputProps={{
                endAdornment: (
                  <Button
                    sx={{
                      visibility: mail ? "visible" : "hidden",
                      "&:hover": { backgroundColor: "transparent" },
                    }}
                    onClick={() => setMail("")}
                    aria-label="メールアドレスをクリア"
                  >
                    <Clear sx={{ color: "#999" }} />
                  </Button>
                ),
              }}
              onChange={(e) => setMail(e.target.value)}
            />
            <TextField
              className={styles.input_area}
              label="お問い合わせ内容"
              name="content"
              multiline
              rows={3}
              variant="outlined"
              required
              style={{
                backgroundColor: "#00000010",
                width: "100%",
                height: "auto",
                margin: "30px 0 0 0",
              }}
              size="medium"
              onChange={(e) => setText(e.target.value)}
              value={text}
              InputProps={{
                endAdornment: (
                  <Button
                    sx={{
                      visibility: text ? "visible" : "hidden",
                      "&:hover": { backgroundColor: "transparent" },
                    }}
                    onClick={() => setText("")}
                    aria-label="お問い合わせ内容をクリア"
                  >
                    <Clear sx={{ color: "#999" }} />
                  </Button>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              endIcon={
                status === "loading" ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <SendIcon />
                )
              }
              disabled={status === "loading"}
              style={{ width: "100%", height: "auto", margin: " 60px 0 0 0" }}
            >
              {status === "loading" ? "送信中..." : "送信する"}
            </Button>
          </div>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
