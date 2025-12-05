'use client';

import { SparklesIcon } from 'lucide-react';
import {
  Banner,
  BannerIcon,
  BannerTitle,
  BannerAction,
  BannerClose,
} from '@/components/ui/shadcn-io/banner';
import { LANDING_CONSTANTS } from '../../constants';

export function LandingBanner() {
  return (
    <Banner className="py-0">
      <BannerTitle className="text-center">{LANDING_CONSTANTS.BANNER.MESSAGE}</BannerTitle>
      {/* <BannerAction onClick={() => console.log('Get Started clicked')}>
        {LANDING_CONSTANTS.BANNER.CTA_TEXT}
      </BannerAction> */}
      <BannerClose />
    </Banner>
  );
}
