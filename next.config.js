/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		forceSwcTransforms: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: '**',
			},
		],
	},
	compiler: {
		reactRemoveProperties: { properties: ['^data-testid$'] },
	},
}

module.exports = nextConfig
