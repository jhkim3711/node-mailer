/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 정적 HTML로 빌드
  images: {
    unoptimized: true // export 모드에서 필수
  }
  /* config options here */
};

export default nextConfig;
