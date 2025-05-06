
/**
 * Utility for optimizing image loading
 */
export class ImageLoader {
  /**
   * Preload an array of images and return a promise that resolves when all are loaded
   */
  static preloadImages(urls: string[]): Promise<void[]> {
    const promises = urls.map(url => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => {
          console.error(`Failed to load image: ${url}`);
          resolve(); // Resolve anyway to not block other images
        };
        img.src = url;
      });
    });
    
    return Promise.all(promises);
  }
  
  /**
   * Get optimized image URL (adds size parameters for external URLs)
   */
  static getOptimizedUrl(url: string, width?: number, quality = 80): string {
    // If it's an Unsplash URL, use their image API
    if (url.includes('unsplash.com') && width) {
      return `${url}&w=${width}&q=${quality}&auto=format`;
    }
    
    // For local images, return as is
    return url;
  }

  /**
   * Determine if an image URL is an array of images (for carousel)
   * This helps identify when we should use a carousel vs a single image
   */
  static isImageArray(image: string | string[]): image is string[] {
    return Array.isArray(image);
  }
}
