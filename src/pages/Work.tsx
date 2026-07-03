import Header from "../component/Header";
import { db } from "../../Firebase/db";
import { Box, Card, IconButton } from "@mui/material";
import Slider from "react-slick";
import Footer from "../component/Footer";
import styles from "@/styles/Work.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState } from "react";
import Heads from "@/component/Heads";
import Image from "next/image";
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
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  return (
    <>
      <Heads />
      <Header />
      <div className={styles.works}>
        <h1 className={styles.title}>Work</h1>
        <div className={styles.carouselSection}>
          <IconButton
            onClick={() => {
              slicker.current?.slickPrev();
              miniSlicker.current?.slickPrev();
            }}
            className={`${styles.heroArrow} ${styles.heroArrowLeft}`}
          >
            <ArrowBackIosNewIcon fontSize="large" />
          </IconButton>
          <div
            onMouseOver={() => {
              slicker.current?.slickPause();
              miniSlicker.current?.slickPause();
            }}
            onMouseOut={() => {
              slicker.current?.slickPlay();
              miniSlicker.current?.slickPlay();
            }}
          >
            <Slider
              dots={false}
              lazyLoad="ondemand"
              infinite
              slidesToShow={1}
              slidesToScroll={1}
              autoplay
              autoplaySpeed={2000}
              centerMode
              centerPadding="0px"
              arrows={false}
              ref={slicker}
              adaptiveHeight
              responsive={[
                {
                  breakpoint: 600,
                  settings: {
                    centerMode: false,
                    centerPadding: "0",
                    adaptiveHeight: true,
                  },
                },
              ]}
            >
              {taskss.map((task: Tasks) => (
                <div key={task.id}>
                  <Card
                    key={task.id}
                    component="a"
                    target="_blank"
                    href={task.link}
                    className={`${styles.heroCard} ${styles.cardFlx}`}
                  >
                    <Card
                      className={styles.heroImageCard}
                    >
                      <Image
                        className={styles.heroImage}
                        src={failedImages[task.id] ? "/no-image.svg" : task.image}
                        alt={task.name}
                        fill
                        sizes="(max-width: 900px) 90vw, 420px"
                        unoptimized
                        onError={() => {
                          setFailedImages((prev) => ({ ...prev, [task.id]: true }));
                        }}
                      />
                    </Card>
                    <div className={styles.cardStr}>
                      <h2>{task.name}</h2>
                      <br />
                      <p>{task.others}</p>
                      <br />
                      <p>{task.info}</p>
                      <br />
                      <p>制作期間：{task.period}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </Slider>
          </div>
          <Box className={styles.thumbContainer}>
            <div className={styles.thumbArrows}>
              <IconButton
                onClick={() => {
                  miniSlicker.current?.slickPrev();
                  slicker.current?.slickPrev();
                }}
              >
                <ArrowBackIosNewIcon fontSize="large" />
              </IconButton>
              <IconButton
                onClick={() => {
                  miniSlicker.current?.slickNext();
                  slicker.current?.slickNext();
                }}
              >
                <ArrowForwardIosIcon fontSize="large" />
              </IconButton>
            </div>
            <div
              className={styles.thumbSliderWrap}
              onMouseOver={() => {
                slicker.current?.slickPause();
                miniSlicker.current?.slickPause();
              }}
              onMouseOut={() => {
                slicker.current?.slickPlay();
                miniSlicker.current?.slickPlay();
              }}
            >
              <Slider
                ref={miniSlicker}
                dots={false}
                lazyLoad="ondemand"
                infinite
                slidesToShow={3}
                slidesToScroll={1}
                autoplay
                autoplaySpeed={2000}
                centerMode
                centerPadding="10%"
                arrows={false}
                responsive={[
                  {
                    breakpoint: 900,
                    settings: {
                      slidesToShow: 2,
                      centerPadding: "0",
                    },
                  },
                  {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 1,
                      centerPadding: "0",
                    },
                  },
                ]}
              >
                {taskss.map((task: Tasks) => (
                  <div
                    style={{
                      height: "auto",
                      margin: "0",
                      padding: "0",
                    }}
                    key={task.id}
                    id={task.id}
                    onClick={(e) => {
                      slicker.current?.slickGoTo(
                        Number(e.currentTarget.id) - 1
                      );
                      miniSlicker.current?.slickGoTo(
                        Number(e.currentTarget.id) - 1
                      );
                    }}
                  >
                    <Card
                      component="div"
                      className={styles.samb}
                      key={task.id}
                      style={{
                        width: "130px",
                        height: "70px",
                        margin: "0 0 0 10px",
                      }}
                    >
                      <Image
                        className={styles.thumbImage}
                        src={failedImages[task.id] ? "/no-image.svg" : task.image}
                        alt={task.name}
                        fill
                        sizes="130px"
                        unoptimized
                        onError={() => {
                          setFailedImages((prev) => ({ ...prev, [task.id]: true }));
                        }}
                      />
                    </Card>
                  </div>
                ))}
              </Slider>
            </div>
          </Box>
          <IconButton
            onClick={() => {
              slicker.current?.slickNext();
              miniSlicker.current?.slickNext();
            }}
            className={`${styles.heroArrow} ${styles.heroArrowRight}`}
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
      others: doc.data().others.replace("<br/>", "\n"),
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
