/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
      config.externals = config.externals || {}
      config.externals['@mapbox/node-pre-gyp'] = 'empty'
      config.externals.bcrypt = 'empty'
    }
    return config
  }
}

export default nextConfig
