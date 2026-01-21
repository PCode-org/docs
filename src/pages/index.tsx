import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HeroSection from '../components/home/HeroSection';
import ActivityMetricsSection from '../components/home/ActivityMetricsSection';
import FeaturesShowcase from '../components/home/FeaturesShowcase';
import VideoPlayer from '../components/home/VideoPlayer';
import ShowcaseSection from '../components/home/ShowcaseSection';
import QuickStartSection from '../components/home/QuickStartSection';
import BilibiliVideo from '../theme/BilibiliVideo';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.title}`} description="智能 · 便捷 · 有趣 - 用 AI 重新定义代码开发体验">
      <main>
        <HeroSection />
        <ActivityMetricsSection />
        <FeaturesShowcase />
        <VideoPlayer />
        <BilibiliVideo />
        <ShowcaseSection />
        <QuickStartSection />
      </main>
    </Layout>
  );
}
