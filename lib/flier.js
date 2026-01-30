import { Basic } from './templates/basic';
import { LuxuryDark } from './templates/LuxuryDark';

const templates = {
  'basic': Basic,
  'luxury-dark': LuxuryDark,
};

export const getHtml = (templateId, data) => {
  const render = templates[templateId] || templates['basic'];
  
  return `
    <!DOCTYPE html>
    <html>
      <head><meta charset="UTF-8"></head>
      <body style="margin:0;">
        ${render(data)}
      </body>
    </html>
  `;
};