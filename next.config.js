const now = new Date()
// "YYYY.MM" — baked in at build time so server and client render the same revision/year.
const buildRev = `${now.getUTCFullYear()}.${String(now.getUTCMonth() + 1).padStart(2, '0')}`

module.exports = {
    env: {
        NEXT_PUBLIC_BASE_URL: 'https://bubbajoe.dev',
        NEXT_PUBLIC_BUILD_REV: buildRev,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'github.com',
                pathname: '/bubbajoe**',
            },
        ],
    },
}
