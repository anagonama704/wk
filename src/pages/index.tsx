import { useState } from "react";
import Header from "../component/Header";
import styles from "../styles/Home.module.css";
import { Card } from "@mui/material";
import Footer from "../component/Footer";
import Heads from "@/component/Heads";
import Image from "next/image";
import { fetchWorks } from "@/lib/works";
import { staticPropsWithRevalidate } from "@/lib/staticProps";
import type { WorkItem } from "@/types/portfolio";

interface HomeProps {
  tasks: WorkItem[];
}

export default function Home({ tasks }: HomeProps) {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <>
      <Heads
        title="WK-portfolio | Watanabe Kei"
        description="渡辺慧のポートフォリオサイト。制作実績・スキル・お問い合わせはこちら。"
      />
      <Header />
      <div className={styles.main}>
        <div className={styles.visual}>
          <div style={{ textAlign: "center" }}>
            <h1 className={styles.visual_h1}>Watanabe Kei</h1>
          </div>
        </div>
        <div className={styles.cardcmp}>
          <div className={styles.cardGrid}>
            {tasks.map((task) => (
              <Card
                className={styles.miniCard}
                key={task.id}
                component="a"
                href={task.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  margin: "0",
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
                <div className={styles.card_visual}>
                  <Image
                    className={styles.card_image}
                    src={failedImages[task.id] ? "/no-image.svg" : task.image}
                    alt={task.name}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 360px"
                    onError={() => {
                      setFailedImages((prev) => ({ ...prev, [task.id]: true }));
                    }}
                  />
                </div>
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
  try {
    const tasks = await fetchWorks();
    return staticPropsWithRevalidate({ tasks });
  } catch {
    return staticPropsWithRevalidate({ tasks: [] });
  }
}
