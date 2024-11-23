export const imageConfig = {
  formats: ['webp', 'avif'],
  quality: 80,
  defaultWidth: 800,
  defaultHeight: 600,
  placeholderSize: 20,
  blurAmount: 10,
  blurhashX: 4,
  blurhashY: 4,
  cacheDuration: 31536000, // 1 year in seconds
  sizes: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};
