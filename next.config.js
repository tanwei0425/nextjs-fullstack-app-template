/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
    distDir: 'build',
    sassOptions: {
        includePaths: [path.join(__dirname, 'src/styles')],
    },
};

module.exports = nextConfig;
