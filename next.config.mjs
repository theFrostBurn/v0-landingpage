/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 빌드 중 ESLint 검사 비활성화
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 타입 체크 비활성화
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
