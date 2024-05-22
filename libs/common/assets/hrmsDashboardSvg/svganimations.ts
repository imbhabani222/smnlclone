export const infiniteRotate = {
  animate: {
    rotate: 360,
  },
  transition: {
    duration: 2, // Adjust the duration as needed
    repeat: Infinity, // Infinite loop
    ease: 'linear', // Linear easing for a smooth rotation
  },
};
export const rotateanimation: any = {
  hover: (ishover: any) => {
    return {
      rotate: ishover ? [0, 360, 0] : 0,
      transition: {
        duration: 2,
        repeat: ishover ? Infinity : 0,
        repeatDelay: 0.5,
        ease: 'linear', // Linear easing for a smooth rotation
      },
    };
  },
};
export const pathlineanimation: any = {
  hover: (ishover: any) => {
    return {
      pathLength: ishover ? [0, 1] : 1,
      transition: {
        duration: 0.8,
        repeat: ishover ? Infinity : 0,
        repeatDelay: 0.5,
        ease: 'linear', // Linear easing for a smooth rotation
      },
    };
  },
};
export const pathLengthOpacity: any = {
  hover: (ishover: any) => {
    return {
      opacity: ishover ? [0, 1] : 1,
      transition: {
        duration: 1,
        repeat: ishover ? Infinity : 0,
        repeatDelay: 0.5,
        ease: 'linear', // Linear easing for a smooth rotation
      },
    };
  },
};
export const assettruckanimation: any = {
  hover: (ishover: any) => {
    return {
      x: ishover ? [0, 10, -10] : 0,
      transition: {
        duration: 0.8,
        repeat: ishover ? Infinity : 0,
        repeatDelay: 0.5,
        ease: 'linear', // Linear easing for a smooth rotation
      },
    };
  },
};
