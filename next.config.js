/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'github.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'www.apollographql.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'seb-awesome-links.s3.amazonaws.com',
                port: '',
                pathname: '/**',
            }
        ],
    },
    // hack: https://github.com/aws/aws-sdk-js-v3/issues/5216
    webpack: (config, {}) => {
        config.externals.push({
            '@aws-sdk/signature-v4-multi-region': 'commonjs @aws-sdk/signature-v4-multi-region',
        })

        return config
    },
}

module.exports = nextConfig
