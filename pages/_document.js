// Re-implement default document component: https://nextjs.org/docs/advanced-features/custom-document
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document(params) {
  const route = params?.__NEXT_DATA__?.page;
  // API Docs don't look good on dark theme
  const theme = route == '/api-doc' ? 'default' : 'dark';
  return (
    <Html data-theme={theme}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
