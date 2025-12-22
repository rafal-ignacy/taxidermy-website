import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Function to send metrics to analytics endpoint
// You can modify this to send to Google Analytics, your backend, or console
function sendToAnalytics(metric) {
  // Option 1: Send to Google Analytics 4
  // if (typeof gtag !== 'undefined') {
  //   gtag('event', metric.name, {
  //     event_category: 'Web Vitals',
  //     value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
  //     event_label: metric.id,
  //     non_interaction: true,
  //   });
  // }

  // Option 2: Send to your backend API
  // fetch('/api/analytics', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(metric),
  // });

  // Option 3: Console log for development
  console.log('Web Vital:', {
    name: metric.name,
    value: metric.value,
    id: metric.id,
    rating: metric.rating,
    delta: metric.delta,
  });
}

// Report all Core Web Vitals
export function reportWebVitals() {
  // Cumulative Layout Shift (CLS) - measures visual stability
  getCLS(sendToAnalytics);
  
  // First Input Delay (FID) - measures interactivity
  getFID(sendToAnalytics);
  
  // First Contentful Paint (FCP) - measures loading performance
  getFCP(sendToAnalytics);
  
  // Largest Contentful Paint (LCP) - measures loading performance
  getLCP(sendToAnalytics);
  
  // Time to First Byte (TTFB) - measures server response time
  getTTFB(sendToAnalytics);
  
  // Note: INP (Interaction to Next Paint) is not available in web-vitals v2
  // It was introduced in v3. To use INP, upgrade to web-vitals v3+
}

// Web Vitals thresholds (for reference)
// Good thresholds:
// - CLS: < 0.1
// - FID: < 100ms
// - FCP: < 1.8s
// - LCP: < 2.5s
// - TTFB: < 800ms
// - INP: < 200ms

export default reportWebVitals;

