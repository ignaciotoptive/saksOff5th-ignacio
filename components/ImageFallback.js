import { useState } from 'react';

export default function ImageFallback({
  src,
  fallbackSrc = '/images/no-image.jpg',
  ...rest
}) {
  const [errorLoading, setErrorLoading] = useState(false);

  return !!src && !errorLoading ? (
    <img
      {...rest}
      src={src}
      onError={() => {
        console.log('Load image error', src);
        setErrorLoading(true);
      }}
    />
  ) : (
    <img src={fallbackSrc} />
  );
}
