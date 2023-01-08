/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
    })

    config.experiments = {
      asyncWebAssembly: true
    }
    return config
  },
}

module.exports = nextConfig
