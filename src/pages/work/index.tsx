import Header from "../../component/Header";
import { Box, Card, IconButton } from "@mui/material";
import Slider from "react-slick";
import Footer from "../../component/Footer";
import styles from "@/styles/Work.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "slick-carousel/slick/slick.css";
import { useRef, useState } from "react";
import Heads from "@/component/Heads";
import Image from "next/image";
import { fetchWorks } from "@/lib/works";
import { staticPropsWithRevalidate } from "@/lib/staticProps";
import type { WorkItem } from "@/types/portfolio";

interface WorkProps {
  tasks: WorkItem[];
}

const Work = ({ tasks }: WorkProps) => {
  const slicker = useRef<Slider>(null);
  const miniSlicker = useRef<Slider>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const goToSlide = (index: number) => {
    slicker.current?.slickGoTo(index);
    miniSlicker.current?.slickGoTo(index);
  };

  return (
    <>
      <Heads
        title="Work | WK-portfolio"
        description="渡辺慧の制作実績一覧。"
      />
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
            aria-label="前の作品を表示"
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
            >
              {tasks.map((task) => (
                <div key={task.id}>
                  <Card
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={task.link}
                    className={`${styles.heroCard} ${styles.cardFlx}`}
                  >
                    <Card className={styles.heroImageCard}>
                      <Image
                        className={styles.heroImage}
                        src={
                          failedImages[task.id] ? "/no-image.svg" : task.image
                        }
                        alt={task.name}
                        fill
                        sizes="(max-width: 900px) 90vw, 420px"
                        onError={() => {
                          setFailedImages((prev) => ({
                            ...prev,
                            [task.id]: true,
                          }));
                        }}
                      />
                    </Card>
                    <div className={styles.cardStr}>
                      <h2>{task.name}</h2>
                      <br />
                      <p style={{ whiteSpace: "pre-line" }}>{task.others}</p>
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
                aria-label="前のサムネイル"
              >
                <ArrowBackIosNewIcon fontSize="large" />
              </IconButton>
              <IconButton
                onClick={() => {
                  miniSlicker.current?.slickNext();
                  slicker.current?.slickNext();
                }}
                aria-label="次のサムネイル"
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
                {tasks.map((task, index) => (
                  <div
                    style={{
                      height: "auto",
                      margin: "0",
                      padding: "0",
                    }}
                    key={task.id}
                    onClick={() => goToSlide(index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        goToSlide(index);
                      }
                    }}
                  >
                    <Card
                      component="div"
                      className={styles.samb}
                      style={{
                        width: "130px",
                        height: "70px",
                        margin: "0 0 0 10px",
                      }}
                    >
                      <Image
                        className={styles.thumbImage}
                        src={
                          failedImages[task.id] ? "/no-image.svg" : task.image
                        }
                        alt={task.name}
                        fill
                        sizes="130px"
                        onError={() => {
                          setFailedImages((prev) => ({
                            ...prev,
                            [task.id]: true,
                          }));
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
            aria-label="次の作品を表示"
          >
            <ArrowForwardIosIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Work;

export async function getStaticProps() {
  try {
    const tasks = await fetchWorks();
    return staticPropsWithRevalidate({ tasks });
  } catch {
    return staticPropsWithRevalidate({ tasks: [] });
  }
}
