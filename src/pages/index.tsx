import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";
import { db } from "../../Firebase/db";
import Header from "../component/Header";
import styles from "../styles/Home.module.css";
import { Card } from "@mui/material";
import Footer from "../component/Footer";

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
  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={styles.visual}>
          <h1>Firebaseのページ</h1>
        </div>
        <div className={styles.cardcmp}>
          {taskss.map((task: Tasks) => (
            <div
              key={task.id}
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              <Card
                className={styles.miniCard}
                key={task.id}
                component="a"
                href={task.link}
                target="_blank"
              >
                {/* <Image src={task.image} width={100} height={100} alt="ok"></Image> */}
                <div
                  style={{
                    width: "300px",
                    height: "160px",
                    backgroundImage: `url(${task.image})`,
                    backgroundSize: "cover",
                    border: "#000 1px solid",
                  }}
                ></div>
              </Card>
              <Card
                className={styles.miniCard}
                key={task.id}
                component="a"
                href={task.link}
                target="_blank"
              >
                {/* <Image src={task.image} width={100} height={100} alt="ok"></Image> */}
                <div
                  style={{
                    width: "300px",
                    height: "160px",
                    backgroundImage: `url(${task.image})`,
                    backgroundSize: "cover",
                    border: "#000 1px solid",
                  }}
                ></div>
              </Card>
              <Card
                className={styles.miniCard}
                key={task.id}
                component="a"
                href={task.link}
                target="_blank"
              >
                {/* <Image src={task.image} width={100} height={100} alt="ok"></Image> */}
                <div
                  style={{
                    width: "300px",
                    height: "160px",
                    backgroundImage: `url(${task.image})`,
                    backgroundSize: "cover",
                    border: "#000 1px solid",
                  }}
                ></div>
              </Card>
            </div>
          ))}
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
