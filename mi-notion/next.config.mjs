import { withContentlayer } from 'next-contentlayer'

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    mdxRs: true
  }
}

export default withContentlayer(nextConfig)
