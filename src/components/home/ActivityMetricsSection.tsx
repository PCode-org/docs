import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import styles from './activityMetricsSection.module.css';

interface ActivityMetricsData {
  lastUpdated: string;
  dockerHub: {
    pullCount: number;
    repository: string;
  };
  clarity: {
    activeUsers: number;
    activeSessions: number;
    dateRange: string;
  };
}

interface ActivityMetricCardProps {
  icon: string;
  title: string;
  value: number | string;
  description: string;
  gradient: string;
  index: number;
  isLoading: boolean;
}

// 数字滚动动画组件
function CountUp({ value, duration = 1.5 }: { value: number; duration?: number }): JSX.Element {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView && !hasAnimated && value > 0) {
      setHasAnimated(true);
      const startTime = Date.now();
      const endTime = startTime + duration * 1000;

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / (duration * 1000), 1);

        // 缓动函数实现平滑动画
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setDisplayValue(Math.floor(easeOutQuart * value));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, hasAnimated, value, duration]);

  const formatValue = (val: number): string => {
    if (val >= 100000000) return `${(val / 100000000).toFixed(1)}亿`;
    if (val >= 10000) return `${(val / 10000).toFixed(1)}万`;
    return val.toString();
  };

  return <span ref={ref}>{formatValue(displayValue)}</span>;
}

// 骨架屏加载器
function MetricCardSkeleton(): JSX.Element {
  return (
    <div className={`${styles.metricCard} ${styles.skeleton}`}>
      <div className={styles.skeletonIcon} />
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonValue} />
      <div className={styles.skeletonDescription} />
    </div>
  );
}

// 空状态展示
function EmptyState(): JSX.Element {
  return (
    <motion.div
      className={styles.emptyState}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.emptyIcon}>📊</div>
      <h3 className={styles.emptyTitle}>数据即将上线</h3>
      <p className={styles.emptyDescription}>
        活动数据将在数据可用后显示在这里。
        敬请期待社区的成长！
      </p>
      <motion.div
        className={styles.pulseIndicator}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}

function ActivityMetricCard({
  icon,
  title,
  value,
  description,
  gradient,
  index,
  isLoading,
}: ActivityMetricCardProps): JSX.Element {
  if (isLoading) {
    return <MetricCardSkeleton />;
  }

  const getValue = (): number | string => {
    if (typeof value === 'string') return value;
    if (value === 0) return '--';
    return value;
  };

  return (
    <motion.div
      className={styles.metricCard}
      style={{ '--card-gradient': gradient } as React.CSSProperties}
      initial={{ opacity: 0, translateY: 30, scale: 0.95 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{
        translateY: -8,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
    >
      {/* 渐变边框 */}
      <div className={styles.cardBorder} />

      {/* 玻璃态效果覆盖层 */}
      <div className={styles.glassOverlay} />

      {/* 悬停时的闪光效果 */}
      <div className={styles.shimmer} />

      <div className={styles.cardContent}>
        {/* 带浮动动画的图标 */}
        <motion.div
          className={styles.metricIcon}
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.2,
          }}
        >
          {icon}
        </motion.div>

        <h3 className={styles.metricTitle}>{title}</h3>

        <div className={styles.metricValue}>
          {typeof value === 'number' && value > 0 ? (
            <CountUp value={value} />
          ) : (
            getValue()
          )}
        </div>

        <p className={styles.metricDescription}>{description}</p>
      </div>

      {/* 装饰性粒子 */}
      <div className={styles.particles}>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            initial={{
              x: '50%',
              y: '50%',
              opacity: 0,
            }}
            animate={{
              x: ['50%', `${50 + (Math.random() - 0.5) * 100}%`],
              y: ['50%', `${50 + (Math.random() - 0.5) * 100}%`],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// 直接导入 JSON 文件
let metricsData: ActivityMetricsData | null = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  metricsData = require('../../../data/activity-metrics.json');
} catch {
  // 文件尚不存在
}

export default function ActivityMetricsSection(): JSX.Element | null {
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      // 模拟加载以产生视觉效果
      const timer = setTimeout(() => setIsLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // 默认占位数据
  const defaultData: ActivityMetricsData = {
    lastUpdated: new Date().toISOString(),
    dockerHub: {
      pullCount: 0,
      repository: 'newbe36524/hagicode',
    },
    clarity: {
      activeUsers: 0,
      activeSessions: 0,
      dateRange: '3Days',
    },
  };

  const data = metricsData || defaultData;
  const hasRealData =
    data.dockerHub.pullCount > 0 ||
    data.clarity.activeUsers > 0 ||
    data.clarity.activeSessions > 0;

  const metrics: ActivityMetricCardProps[] = [
    {
      icon: '\uD83D\uDC33', // 🐳
      title: 'Docker Hub',
      value: data.dockerHub.pullCount,
      description: '拉取次数',
      gradient: 'linear-gradient(135deg, #4ECDC4, #45B7D1)',
      index: 0,
      isLoading,
    },
    {
      icon: '\uD83D\uDC65', // 👥
      title: '活跃用户',
      value: data.clarity.activeUsers,
      description: '近三天',
      gradient: 'linear-gradient(135deg, #FF6B6B, #6C5CE7)',
      index: 1,
      isLoading,
    },
    {
      icon: '\uD83D\uDCAC', // 💬
      title: '活跃会话',
      value: data.clarity.activeSessions,
      description: '近三天',
      gradient: 'linear-gradient(135deg, #A29BFE, #FD79A8)',
      index: 2,
      isLoading,
    },
  ];

  return (
    <section ref={sectionRef} className={styles.activityMetricsSection}>
      {/* 动画背景网格 */}
      <div className={styles.bgMesh} />
      <div className={styles.bgGradient} />

      <div className="container">
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, translateY: 20 }}
          animate={isInView ? { opacity: 1, translateY: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>
            <span className={styles.titleHighlight}>项目活动数据</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            查看社区的成长情况
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              className={styles.metricsGrid}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {metrics.map((metric) => (
                <MetricCardSkeleton key={`${metric.title}-skeleton`} />
              ))}
            </motion.div>
          ) : hasRealData ? (
            <motion.div
              key="loaded"
              className={styles.metricsGrid}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {metrics.map((metric) => (
                <ActivityMetricCard key={metric.title} {...metric} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EmptyState />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
