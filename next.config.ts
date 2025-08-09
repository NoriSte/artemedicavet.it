import type { NextConfig } from 'next'
import { PHASE_PRODUCTION_BUILD } from 'next/constants'

function getConfig(phase: string, { defaultConfig }: { defaultConfig: NextConfig }): NextConfig {
  const nextConfig: NextConfig = {
    ...defaultConfig,

    // Enable typed routes only in prod to keep using turbopack in dev
    experimental: {
      typedRoutes: phase === PHASE_PRODUCTION_BUILD,
    },
  }

  return nextConfig
}
export default getConfig
