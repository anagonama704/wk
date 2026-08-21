import Head from "next/head";

interface HeadsProps {
  title?: string;
  description?: string;
}

const DEFAULT_TITLE = "WK-portfolio";
const DEFAULT_DESCRIPTION =
  "渡辺慧（Watanabe Kei）のポートフォリオサイト。制作実績・スキル・お問い合わせ。";

const Heads = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
}: HeadsProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="google-site-verification"
        content="EaYYRtxr_oWajG6tBhr0kT4DydanpdWLIpHgUfQKuME"
      />
    </Head>
  );
};

export default Heads;
