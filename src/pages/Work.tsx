import next from "next/types";
import Link from "next/link";
import Header from "../component/Header";
import { db } from "../../Firebase/db";
import { Card } from "@mui/material";
import Image from "next/image";
import Slider from "react-slick";
import Footer from "../component/Footer";
import styles from "@/styles/Work.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "slick-carousel/slick/slick.css";
interface Tasks {
  id: string;
  image: string;
  name: string;
  others: string;
  info: string;
  period: string;
  link: string;
}
const Top = ({ tasks }: any) => {
  const taskss: Tasks[] = tasks;
  const title: string = "ポートフォリオ";
  return (
    <>
      <Header />
      <div className={styles.works}>
        <h1>Firebaseのページ</h1>

        <Slider
          dots
          lazyLoad="ondemand"
          infinite
          slidesToShow={1}
          slidesToScroll={1}
          className="slides"
          autoplay
          autoplaySpeed={2000}
          centerMode
          arrows={false}
        >
          {taskss.map((task: Tasks) => (
            <div key={task.id}>
              <Card
                key={task.id}
                style={{
                  backgroundColor: "#fff",
                  width: "70%",
                  height: "500px",
                  margin: "0 auto",
                }}
                className={styles.cardFlx}
              >
                <Card
                  style={{
                    width: "50%",
                    height: "300px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#c8e0e3",
                  }}
                >
                  <div
                    style={{
                      width: "90%",
                      height: "83%",
                      backgroundImage: `url(${task.image})`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </Card>
                <div className={styles.cardStr}>
                  <p>{task.name}</p>
                  <p>{task.others}</p>
                  <p>{task.info}</p>

                  <p>{task.period}</p>

                  <a href={task.link} target="_blank">
                    aaaa
                  </a>
                </div>
              </Card>
            </div>
          ))}
        </Slider>
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
    tasks.push(data);
  });
  return {
    props: {
      tasks,
    },
  };
}
