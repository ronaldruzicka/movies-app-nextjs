const image_base = process.env.NEXT_PUBLIC_IMAGE_URL;

type BackdropSizes = 300 | 780 | 1280 | 'original';

export const getBackdrop = (options: { path: string | null; size: BackdropSizes }) => {
  const { path, size } = options;
  const backdrop_size = typeof size === 'number' ? `w${size}` : size;

  return `${image_base}/${backdrop_size}${path}`;
};

type PosterSizes = 92 | 154 | 185 | 342 | 500 | 780 | 'original';

export const getPoster = (options: { path: string; size: PosterSizes }) => {
  const { path, size } = options;
  const poster_size = typeof size === 'number' ? `w${size}` : size;

  return `${image_base}/${poster_size}${path}`;
};

type ProfileSizes = 45 | 185 | 'original';

export const getProfileImage = (options: { path: string; size: ProfileSizes }) => {
  const { path, size } = options;
  const profile_size = typeof size === 'number' ? `w${size}` : size;

  return `${image_base}/${profile_size}${path}`;
};
