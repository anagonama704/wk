import next from "next/types";
import Header from "../component/Header";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import styles from "@/styles/About.module.css";
import Image from "next/image";

const About = () => {
  return (
    <div>
      <Header />
      <div className={styles.about}>
        <Card
          className={`${styles.cards} ${styles.imgflip}`}
          component="figure"
        >
          <div className={styles.flexs}>
            <div className={styles.myimg}>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/my-portfolio-30354.appspot.com/o/my_img.jpg?alt=media&token=af7a60bb-7c10-4d4e-9cbb-232cfb7c6cac"
                alt=""
                width={300}
                height={226}
                className={styles.fli}
              />
            </div>
            <div className={`${styles.fli} ${styles.pro}`}>
              <h3 className={styles.fli}>Profile</h3>
              <div className={`${styles.flexs} ${styles.p_pd}`}>
                <p style={{ fontSize: "16px" }}>渡辺　慧</p>
                <p style={{ fontSize: "16px" }}>Watanabe Kei</p>
              </div>
              <div className={`${styles.flexs} ${styles.p_pd}`}>
                <p style={{ fontSize: "16px" }}>生年月日：</p>
                <p style={{ fontSize: "16px" }}>2001年10月9日生まれ</p>
              </div>
              <div className={`${styles.flexs} ${styles.p_pd}`}>
                <p style={{ fontSize: "16px" }}>出身地：</p>
                <p style={{ fontSize: "16px" }}>岐阜県岐阜市</p>
              </div>
              <div className={`${styles.flexs} ${styles.p_pd}`}>
                <p style={{ fontSize: "16px" }}>趣味：</p>
                <p style={{ fontSize: "16px" }}>
                  音楽を聴くこと（Kpop , 洋楽）
                </p>
              </div>
            </div>
          </div>
          <figcaption className={styles.figcaption}>
            <h3 style={{ padding: "0 0 0 10px" }}>Skill</h3>
            <Card className={styles.skill_cd}>
              <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                }}
              >
                <CircularProgress
                  variant="determinate"
                  value={70}
                  size="80px"
                  style={{ color: "#3dc1db" }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                  >
                    <Image
                      src="https://firebasestorage.googleapis.com/v0/b/my-portfolio-30354.appspot.com/o/html.png?alt=media&token=b147be1a-d8c6-4abf-a533-6fd561cf3e82"
                      alt=""
                      width={40}
                      height={40}
                    />
                  </Typography>
                </Box>
              </Box>
              <h4>HTML</h4>
              <p style={{ fontSize: "16px", width: "65%", height: "auto" }}>
                命名規則を用いたコーディングが行えます。
              </p>
            </Card>
            <Card className={styles.skill_cd}>
              <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                }}
              >
                <CircularProgress
                  variant="determinate"
                  value={60}
                  size="80px"
                  style={{ color: "#3dc1db" }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                  >
                    <Image
                      src="https://firebasestorage.googleapis.com/v0/b/my-portfolio-30354.appspot.com/o/css.png?alt=media&token=74f8cb4a-a96a-467d-b6d6-b0a6b1d96013"
                      alt=""
                      width={40}
                      height={40}
                    />
                  </Typography>
                </Box>
              </Box>
              <h4>CSS3</h4>
              <p style={{ fontSize: "16px", width: "65%", height: "auto" }}>
                主流のflexを用いたレイアウト実装やレスポンシブデザインが行えます。
              </p>
            </Card>
            <Card className={styles.skill_cd}>
              <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                }}
              >
                <CircularProgress
                  variant="determinate"
                  value={55}
                  size="80px"
                  style={{ color: "#3dc1db" }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                  >
                    <Image
                      src="https://firebasestorage.googleapis.com/v0/b/my-portfolio-30354.appspot.com/o/js.png?alt=media&token=33bccc32-45f0-4605-b7e7-00d96443bf94"
                      alt=""
                      width={40}
                      height={40}
                    />
                  </Typography>
                </Box>
              </Box>
              <h4>JavaScript</h4>
              <p style={{ fontSize: "16px", width: "65%", height: "auto" }}>
                ライブラリの実装やAPI取得、基本的なコード（Jquery）は問題なく書けます。
              </p>
            </Card>
            <Card className={styles.skill_cd}>
              <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                }}
              >
                <CircularProgress
                  variant="determinate"
                  value={73}
                  size="80px"
                  style={{ color: "#3dc1db" }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="caption" component="div">
                    <Image
                      src="https://firebasestorage.googleapis.com/v0/b/my-portfolio-30354.appspot.com/o/php.png?alt=media&token=a28b57e4-d914-4e79-9a76-232e4a076214"
                      alt=""
                      width={40}
                      height={40}
                    />
                  </Typography>
                </Box>
              </Box>
              <h4>PHP</h4>
              <p style={{ fontSize: "16px", width: "65%", height: "auto" }}>
                PDOを用いたデータベースとの通信やセッションを用いたユーザー認証などができます。
              </p>
            </Card>
            <Card className={styles.skill_cd}>
              <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                }}
              >
                <CircularProgress
                  variant="determinate"
                  value={60}
                  size="80px"
                  style={{ color: "#3dc1db" }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="caption" component="div">
                    <Image
                      src="https://firebasestorage.googleapis.com/v0/b/my-portfolio-30354.appspot.com/o/laravel.png?alt=media&token=3fbedfb2-64c7-4966-a1f1-89e901f8586c"
                      alt=""
                      width={40}
                      height={40}
                    />
                  </Typography>
                </Box>
              </Box>
              <h4>Laravel</h4>
              <p style={{ fontSize: "16px", width: "65%", height: "auto" }}>
                Controllerを用いた処理や、Eloquentを用いてCRUDを行えます。
              </p>
            </Card>
            <Card className={styles.skill_cd}>
              <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                }}
              >
                <CircularProgress size="80px" style={{ color: "#3dc1db" }} />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                  >
                    <Image
                      src="https://firebasestorage.googleapis.com/v0/b/my-portfolio-30354.appspot.com/o/react.png?alt=media&token=85be859e-3f18-473b-94ee-bf029cd2d8f8"
                      alt=""
                      width={40}
                      height={40}
                    />
                  </Typography>
                </Box>
              </Box>
              <h4>React.js</h4>
              <p style={{ fontSize: "16px", width: "65%", height: "auto" }}>
                先月から学習を進めています。
              </p>
            </Card>
          </figcaption>
        </Card>
      </div>
    </div>
  );
};
export default About;
