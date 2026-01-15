import React, {type ReactNode, useEffect} from 'react';

import {useThemeConfig} from '@docusaurus/theme-common';
import FooterLinks from '@theme/Footer/Links';
import FooterLogo from '@theme/Footer/Logo';
import FooterCopyright from '@theme/Footer/Copyright';
import FooterLayout from '@theme/Footer/Layout';

// Extend Window interface to include our global variable
declare global {
  interface Window {
    __CLARITY_PROJECT_ID__?: string;
  }
}

function Footer(): ReactNode {
  const {footer} = useThemeConfig();

  useEffect(() => {
    // Only inject script if CLARITY_PROJECT_ID is configured
    // The value is set by inline script in docusaurus.config.ts
    const clarityProjectId = typeof window !== 'undefined' ? window.__CLARITY_PROJECT_ID__ : undefined;

    if (clarityProjectId) {
      const script = document.createElement('script');
      script.src = `https://www.clarity.ms/tag/${clarityProjectId}`;
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  if (!footer) {
    return null;
  }
  const {copyright, links, logo, style} = footer;

  return (
    <FooterLayout
      style={style}
      links={links && links.length > 0 && <FooterLinks links={links} />}
      logo={logo && <FooterLogo logo={logo} />}
      copyright={copyright && <FooterCopyright copyright={copyright} />}
    />
  );
}

export default React.memo(Footer);
