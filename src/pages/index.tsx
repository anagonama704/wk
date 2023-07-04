import { useState } from "react";
import { db } from "../../Firebase/db";
import Header from "../component/Header";
import styles from "../styles/Home.module.css";
import { Card } from "@mui/material";
import Footer from "../component/Footer";
import Heads from "@/component/Heads";

interface Tasks {
  id: string;
  image: string;
  name: string;
  others: string;
  info: string;
  period: string;
  link: string;
}

export default function Firebase({ tasks }: any) {
  const taskss: Tasks[] = tasks;
  const [stalkerX, setStalkerX] = useState<number>(0);
  const [stalkerY, setStalkerY] = useState<number>(0);
  const stalker = (e: React.MouseEvent) => {
    setTimeout(() => {
      console.log(e.clientX);
      setStalkerX(e.clientX);
      setStalkerY(e.clientY);
      console.log(e.clientY);
    }, 500);
  };
  const stalkerRiset = () => {
    setStalkerX(0);
    setStalkerY(0);
  };

  return (
    <>
      <Heads />
      <Header />
      <div className={styles.main}>
        <div className={styles.visual} onMouseMove={stalker}>
          {/* <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#bbb",
              opacity: "0.8",
              position: "fixed",
              top: stalkerY + "px",
              left: stalkerX + "px",
              margin: "-20px 0 0 -20px",
            }}
          ></div> */}
          <div style={{ textAlign: "center" }}>
            <h1 className={styles.visual_h1} style={{ color: "#" + stalkerX }}>
              Watanabe Kei
            </h1>
            <br />
            <small className={styles.visual_small}>HAL NAGOYA</small>
          </div>
        </div>
        <div className={styles.cardcmp} onMouseMove={stalkerRiset}>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {taskss.map((task: Tasks) => (
              <Card
                className={styles.miniCard}
                key={task.id}
                component="a"
                href={task.link}
                target="_blank"
              >
                <div
                  className={styles.card_visual}
                  style={{
                    width: "300px",
                    height: "160px",
                    backgroundImage: `url(${task.image})`,
                    backgroundSize: "cover",
                    border: "#ddd 1px solid",
                  }}
                ></div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const tasks: Tasks[] = [];
  const ref = await db.collection("works").get();
  ref.docs.map((doc) => {
    const data = {
      id: doc.id,
      name: doc.data().name,
      others: doc.data().others,
      info: doc.data().info,
      image: doc.data().image,
      period: doc.data().period,
      link: doc.data().link,
    };
    tasks.push(data);
  });
  return {
    props: {
      tasks,
    },
  };
}
