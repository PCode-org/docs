import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

/**
 * BilibiliVideo Component
 *
 * Embeds a Bilibili video player with responsive design.
 * Features:
 * - Bilibili iframe player with external embed mode
 * - 16:9 aspect ratio preservation
 * - Responsive design matching site aesthetic
 * - Gradient border effects on hover
 * - Loading and error states
 * - Theme-aware styling
 */
interface BilibiliVideoProps {
  /** Bilibili video ID (bvid) */
  bvid?: string;
  /** Video content ID (cid) */
  cid?: number;
  /** Part number (for multi-part videos) */
  p?: number;
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
}

export default function BilibiliVideo({
  bvid = 'BV1pirZBuEzq',
  cid = 35399205805,
  p = 1,
  title = '编程实战演示视频',
  description = '观看《每天哈基半小时，AI多任务编程实战》',
}: BilibiliVideoProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Build the Bilibili iframe URL
  const iframeSrc = `//player.bilibili.com/player.html?isOutside=true&aid=115898165822763&bvid=${bvid}&cid=${cid}&p=${p}`;

  // Handle iframe load events
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <section className={styles.bilibiliVideoSection}>
      <div className="container">
        <div className={styles.bilibiliVideoContainer}>
          {/* Section Header */}
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            <p className={styles.sectionDescription}>{description}</p>
          </div>

          {/* Video Wrapper */}
          <div className={styles.videoWrapper}>
            {hasError ? (
              <div className={styles.errorState}>
                <span className={styles.errorIcon}>⚠️</span>
                <p className={styles.errorText}>
                  视频加载失败，请稍后重试或检查网络连接
                </p>
              </div>
            ) : (
              <>
                <iframe
                  className={styles.videoIframe}
                  src={iframeSrc}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  title={title}
                  // Bilibili player permissions
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />

                {isLoading && (
                  <div className={styles.loadingOverlay}>
                    <div className={styles.spinner} />
                    <span className={styles.loadingText}>加载中...</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
