export const Displayletterbyletter = {
  initial: { opacity: 0, x: -10 },
  animate: (i: any) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 1, delay: i * 0.1 },
  }),
  hover: { scale: 1.2 },
};
export const sorticonAnimation = {
  hover: {
    pathLength: [0, 1],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatDelay: 0.5,
      ease: 'linear', // Linear easing for a smooth rotation
    },
  },
};
export const ButtonClickAnimation = {
  tap: {
    scale: 0.9,
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  },
  hover: { scale: 1.1, boxShadow: '0px 0px 8px rgb(255,255,255)' },
};
export const renderchildrensonebyone = {
  initial: { opacity: 0, y: -10 },
  animate: (i: any) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1 },
  }),
};
export const tableAnimation = {
  show: { opacity: 1, transition: { duration: 2.5 } },
  hide: { opacity: 0 },
  //exit: { opacity: 0, transition: { duration: 6 } },
};
export const rotatesettingright = {
  show: {
    rotate: [0, 360],
    fill: ['#1d1a46e1', '#2e2974e1', '#4a42bce1'],
    transition: {
      duration: 2,
      repeat: Infinity,
      // repeatDelay: 0.5,
      ease: 'linear', // Linear easing for a smooth rotation
    },
  },
};
export const rotatesettingright2 = {
  show: {
    rotate: [0, 360],
    fill: ['#1d1a46c1', '#2e2974c1', '#4a42bcc1'],
    transition: {
      duration: 2,
      repeat: Infinity,
      // repeatDelay: 0.5,
      ease: 'linear', // Linear easing for a smooth rotation
    },
  },
};
export const rotatesettingleft = {
  show: {
    rotate: [360, 0],
    fill: ['#1d1a46', '#2e2974', '#4a42bc'],
    transition: {
      // type: 'tween',
      //  yoyo: true,
      duration: 2.5,
      repeat: Infinity,
      // repeatDelay: 0.5,
      ease: 'linear', // Linear easing for a smooth rotation
    },
  },
};

export const loadingAnimation: any = {
  show: {
    transition: {
      duration: 0.8,
      repeat: Infinity,
      //  repeatDelay: 0.2,
      ease: 'linear', // Linear easing for a smooth rotation
    },
  },
  hide: {},
};

export const dotsAnimation: any = {
  start: (i: any) => ({
    y: -10,
  }),
  end: (i: any) => ({
    y: 10,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }),
};
