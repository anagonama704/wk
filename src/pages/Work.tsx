import next from "next/types";
import Link from "next/link";
import Header from "../component/Header";
import { db } from "../../Firebase/db";
import { Card, IconButton } from "@mui/material";
import Image from "next/image";
import Slider from "react-slick";
import Footer from "../component/Footer";
import styles from "@/styles/Work.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "slick-carousel/slick/slick.css";
import { useRef } from "react";
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
  const slicker = useRef<Slider>(null);
  const miniSlicker = useRef<Slider>(null);
  return (
    <>
      <Header />
      <div className={styles.works}>
        <h1
          style={{
            padding: "30px 0 0 0",
            fontSize: "29px",
            textAlign: "center",
          }}
        >
          Work
        </h1>
        <div style={{ padding: "30px 0 30px 0" }}>
          <IconButton
            onClick={() => {
              slicker.current?.slickPrev();
            }}
            style={{
              position: "absolute",
              top: "45%",
              left: "5%",
              zIndex: "10",
            }}
          >
            <ArrowBackIosNewIcon fontSize="large" />
          </IconButton>
          <Slider
            dots={false}
            lazyLoad="ondemand"
            infinite
            slidesToShow={1}
            slidesToScroll={1}
            autoplay
            autoplaySpeed={2000}
            centerMode
            arrows={false}
            ref={slicker}
          >
            {taskss.map((task: Tasks) => (
              <div key={task.id}>
                <Card
                  key={task.id}
                  style={{
                    backgroundColor: "#fff",
                    width: "70%",
                    height: "400px",
                    margin: "0 auto",
                    textDecoration: "none",
                  }}
                  component="a"
                  target="_blank"
                  href={task.link}
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
                  </div>
                </Card>
              </div>
            ))}
          </Slider>
          <div
            style={{ width: "50%", margin: "0 auto", padding: "40px 0 0 0" }}
          >
            <IconButton
              onClick={() => {
                miniSlicker.current?.slickPrev();
              }}
              style={{
                zIndex: "10",
              }}
            >
              <ArrowBackIosNewIcon fontSize="large" />
            </IconButton>
            <IconButton
              onClick={() => {
                miniSlicker.current?.slickNext();
              }}
              style={{
                zIndex: "10",
              }}
            >
              <ArrowForwardIosIcon fontSize="large" />
            </IconButton>
            <Slider
              ref={miniSlicker}
              dots={false}
              lazyLoad="ondemand"
              infinite
              slidesToShow={2}
              slidesToScroll={1}
              autoplay
              autoplaySpeed={2000}
              centerMode
              arrows={false}
            >
              {taskss.map((task: Tasks) => (
                <div
                  style={{
                    width: "fit-content",
                    height: "auto",
                    margin: "0",
                  }}
                  key={task.id}
                  id={task.id}
                  onClick={(e) => {
                    slicker.current?.slickGoTo(Number(e.currentTarget.id) - 1);
                  }}
                >
                  <Card
                    component="div"
                    key={task.id}
                    style={{
                      width: "150px",
                      height: "70px",
                      backgroundImage: `url(${task.image})`,
                      backgroundSize: "cover",
                    }}
                  ></Card>
                </div>
              ))}
            </Slider>
          </div>
          <IconButton
            onClick={() => {
              slicker.current?.slickNext();
            }}
            style={{
              position: "absolute",
              top: "45%",
              right: "5%",
              zIndex: "10",
            }}
          >
            <ArrowForwardIosIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Top;
//worksコレクションの取得
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
