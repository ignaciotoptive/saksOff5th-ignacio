import { useState, useEffect } from 'react';

export default function ImageFallback({
  src,
  fallbackSrc = '/images/no-image.jpg',
  ...rest
}) {
  const [errorLoading, setErrorLoading] = useState(false);
  const [srcUrl, setSrcUrl] = useState(null);

  useEffect(() => {
    if (!!src) setSrcUrl(src.replace('localhost', window.location.hostname));
  }, [src]);

  return !!srcUrl && !errorLoading ? (
    <img
      {...rest}
      src={srcUrl}
      onError={() => {
        setErrorLoading(true);
      }}
    />
  ) : (
    <img src={fallbackSrc} />
  );
}
