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
          <div style={{ textAlign: "center" }}>
            <h1 className={styles.visual_h1} style={{ color: "#" + stalkerX }}>
              Watanabe Kei
            </h1>
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
                style={{
                  margin: "16px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 16px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                }}
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
