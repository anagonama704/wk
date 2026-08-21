import Header from "../component/Header";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import styles from "@/styles/About.module.css";
import Image from "next/image";
import Footer from "@/component/Footer";
import Heads from "@/component/Heads";
import { fetchSkills } from "@/lib/skills";
import { staticPropsWithRevalidate } from "@/lib/staticProps";
import type { SkillItem } from "@/types/portfolio";

const PROFILE_IMAGE =
  "https://firebasestorage.googleapis.com/v0/b/my-portfolio-30354.appspot.com/o/my_img.jpg?alt=media&token=af7a60bb-7c10-4d4e-9cbb-232cfb7c6cac";

interface AboutProps {
  tasks: SkillItem[];
}

const About = ({ tasks }: AboutProps) => {
  return (
    <>
      <Heads
        title="About | WK-portfolio"
        description="渡辺慧のプロフィールとスキル。"
      />
      <Header />
      <div className={styles.about}>
        <Card
          className={`${styles.cards} ${styles.imgflip}`}
          component="figure"
        >
          <div className={styles.flexs}>
            <div className={styles.myimg}>
              <Image
                src={PROFILE_IMAGE}
                alt="渡辺慧のプロフィール写真"
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
            {tasks.map((skil) => (
              <Card className={styles.skill_cd} key={skil.id}>
                <Box
                  sx={{
                    position: "relative",
                    display: "inline-flex",
                  }}
                >
                  <CircularProgress
                    variant={skil.levelstyle ? "determinate" : "indeterminate"}
                    value={skil.level}
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
                        src={skil.image}
                        alt={`${skil.name}のアイコン`}
                        width={40}
                        height={40}
                      />
                    </Typography>
                  </Box>
                </Box>
                <h4>{skil.name}</h4>
                <p style={{ fontSize: "16px", width: "65%", height: "auto" }}>
                  {skil.content}
                </p>
              </Card>
            ))}
          </figcaption>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default About;

export async function getStaticProps() {
  try {
    const tasks = await fetchSkills();
    return staticPropsWithRevalidate({ tasks });
  } catch {
    return staticPropsWithRevalidate({ tasks: [] });
  }
}
