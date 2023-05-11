import next from "next/types";
import Link from "next/link";
import Header from "./component/Header";
import { db } from "../../Firebase/db";
import { Card } from "@mui/material";
import Image from "next/image";
import Footer from "./component/Footer";
import styles from "@/styles/Work.module.css";

const Top = ({ tasks }: any) => {
  const title: string = "ポートフォリオ";
  return (
    <>
      <Header />
      <div className={styles.works}>
        <h1>Firebaseのページ</h1>

        {tasks.map((task: any) => (
          <Card
            key={task.id}
            style={{ backgroundColor: "#eee", width: "80%", height: "800px" }}
          >
            <Card
              style={{
                width: "700px",
                height: "100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#c8e0e3",
              }}
            >
              <div
                style={{
                  width: "80%",
                  height: "80%",
                  backgroundImage: `url(${task.image})`,
                }}
              ></div>
            </Card>
            {task.name}
            {task.others}
            {task.info}

            {task.period}

            <a href={task.link} target="_blank">
              aaaa
            </a>
          </Card>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Top;
export async function getStaticProps() {
  const tasks: any = [];
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
    console.log(data.name);
    tasks.push(data);
  });
  return {
    props: {
      tasks,
    },
  };
}
