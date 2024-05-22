import { motion } from 'framer-motion';
import {
  rotatesettingright,
  rotatesettingleft,
  rotatesettingright2,
  loadingAnimation,
  dotsAnimation,
} from '../../../../libs/common/utils/animations/variants';
import React from 'react';

type Props = {};
function Loader({}: Props) {
  const backgroundStyles: any = {
    display: 'block',
    //position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    //  backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  };
  return (
    <motion.div style={backgroundStyles}>
      <motion.svg
        width="200"
        height="177"
        viewBox="0 0 411 177"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_3_27)">
          <motion.path
            variants={rotatesettingright}
            animate="show"
            d="M30.1765 68.6154H29.7765V69.0154V74.6743L24.3125 76.8772L19.7682 74.5871L19.5367 74.4704L19.3357 74.6341L14.2377 78.7843L13.9731 78.9996L14.144 79.2949L16.7908 83.868L14.2215 90.1569H9.98039H9.63452L9.58458 90.4992L8.60419 97.2186L8.557 97.542L8.86452 97.6527L14.1974 99.5723L16.785 105.161L14.144 109.724L13.9646 110.034L14.253 110.247L19.351 114.002L19.5635 114.158L19.791 114.024L24.3055 111.37L29.2524 113.955L30.7731 119.128L30.8575 119.415H31.1569H37.0392H37.3717L37.4325 119.089L38.5709 112.969L44.2273 110.394L49.3277 114.773L49.6041 115.011L49.8661 114.758L54.572 110.212L54.8056 109.987L54.6328 109.712L51.033 103.983L54.5297 97.6763H59H59.4V97.2763V90.5569V90.2477L59.1007 90.1698L53.2061 88.6366L51.0339 83.8928L54.6087 79.3416L54.8183 79.0746L54.5891 78.8243L49.8832 73.686L49.6761 73.4598L49.4039 73.6012L43.1113 76.8684L38.5693 74.671L37.4316 68.9376L37.3676 68.6154H37.0392H30.1765Z"
            fill="#0047AB"
            fill-opacity="0.7"
            stroke="white"
            stroke-width="0.8"
          />
          <motion.path
            d="M34 106.416C40.8321 106.416 46.4 101.104 46.4 94.5155C46.4 87.9274 40.8321 82.6155 34 82.6155C27.1679 82.6155 21.6 87.9274 21.6 94.5155C21.6 101.104 27.1679 106.416 34 106.416Z"
            fill="#F5F5F5"
            stroke="#F5F5F5"
            stroke-width="0.8"
          />
          <motion.path
            variants={rotatesettingleft}
            //   initial={{ fill: 'red' }}
            animate="show"
            d="M78.3156 8.48896L77.9222 8.56147L77.9947 8.95484L79.7728 18.6014L71.0501 24.1372L62.6256 21.6734L62.3768 21.6006L62.2088 21.798L54.9646 30.3075L54.7435 30.5672L54.9651 30.8266L60.8885 37.761L58.4648 49.3855L51.1893 50.7265L50.8492 50.7892L50.8621 51.1348L51.2937 62.6706L51.306 62.9972L51.6284 63.0504L61.2512 64.6353L67.451 73.3954L64.3931 81.9753L64.2728 82.3127L64.595 82.4693L74.2752 87.1759L74.5125 87.2913L74.712 87.1185L81.5591 81.188L90.8882 84.0667L95.0783 92.3525L95.2134 92.6197L95.5078 92.5654L105.342 90.7527L105.669 90.6924L105.67 90.36L105.687 79.6327L114.617 73.3993L124.648 79.2386L124.962 79.4219L125.174 79.1255L131.641 70.076L131.83 69.8118L131.61 69.5728L123.714 60.9828L127.722 49.0484L135.358 47.6409L135.751 47.5684L135.679 47.175L133.608 35.9413L133.552 35.6372L133.243 35.6149L122.784 34.8585L117.516 27.3484L122.169 18.4866L122.327 18.1861L122.056 17.9815L112.605 10.8413L112.36 10.6564L112.118 10.8447L102.494 18.3324L93.9536 15.9842L90.2332 6.6198L90.1119 6.31458L89.789 6.37412L78.3156 8.48896Z"
            fill="#0047AB"
            stroke="white"
            stroke-width="0.8"
          />
          <motion.path
            d="M96.2731 70.0537C107.606 67.9648 115.215 57.5215 113.219 46.6948C111.224 35.8681 100.391 28.8241 89.0584 30.9131C77.7257 33.002 70.1163 43.4453 72.112 54.272C74.1076 65.0987 84.9403 72.1426 96.2731 70.0537Z"
            fill="#F5F5F5"
            stroke="#F5F5F5"
            stroke-width="0.8"
          />
          <motion.path
            variants={rotatesettingright2}
            animate="show"
            d="M29.5832 18.9451L28.763 22.7712L24.6388 23.4879L21.93 21.3064L18.0659 23.2794L19.1812 26.72L16.4801 30.6765L13.5698 30.0526L12.0075 34.2532L15.2771 36.2882L16.2284 40.494L13.8007 43.1752L16.5712 46.3036L19.9908 45.1692L23.0246 47.6871L23.2987 51.3476L27.0948 52.1614L28.7289 48.243L33.0343 47.2984L35.822 50.9641L39.4877 48.6818L37.9037 44.3403L41.2375 40.5194L44.2744 41.1705L45.204 36.8342L41.5 34.973L40.6925 31.3315L43.7528 28.786L41.4268 24.819L36.7863 26.092L33.951 23.8834L34.012 19.8945L29.5832 18.9451Z"
            fill="#0047AB"
            fill-opacity="0.5"
          />
          <motion.path
            d="M26.9361 43.3319C31.1764 44.2409 35.3497 41.7734 36.2118 37.7523C37.0738 33.7312 34.2787 29.7697 30.0384 28.8607C25.7981 27.9517 21.6248 30.4193 20.7628 34.4404C19.9007 38.4615 22.6959 42.4229 26.9361 43.3319Z"
            fill="#F5F5F5"
            stroke="#F5F5F5"
            stroke-width="0.8"
          />
          <motion.path
            variants={loadingAnimation}
            initial="hide"
            animate="show"
            d="M85.888 121.44C86.5973 121.44 87.232 121.627 87.792 122C88.3893 122.373 88.744 123.027 88.856 123.96C89.304 126.909 89.584 129.859 89.696 132.808C89.8453 135.72 89.92 139.024 89.92 142.72C89.92 144.288 89.7893 147.144 89.528 151.288C91.1707 151.437 92.44 151.512 93.336 151.512C93.9707 151.512 95.408 151.419 97.648 151.232C98.9547 151.045 100.093 150.952 101.064 150.952C101.96 150.952 102.781 151.045 103.528 151.232C104.275 151.381 105.04 151.643 105.824 152.016C106.608 152.464 107 153.155 107 154.088C107 154.835 106.757 155.507 106.272 156.104C105.824 156.701 105.283 157 104.648 157C104.2 157 103.491 156.925 102.52 156.776C100.765 156.515 99.0853 156.384 97.48 156.384C96.9573 156.384 96.36 156.421 95.688 156.496C95.0533 156.533 94.5867 156.552 94.288 156.552C93.392 156.664 92.496 156.72 91.6 156.72C89.7707 156.72 88.128 156.627 86.672 156.44C85.9253 156.365 85.1787 156.085 84.432 155.6C83.6853 155.077 83.312 154.331 83.312 153.36C83.312 152.8 83.3867 151.363 83.536 149.048C83.7973 145.203 83.928 142.272 83.928 140.256C83.928 138.688 83.8533 137.045 83.704 135.328C83.5547 133.611 83.4613 132.528 83.424 132.08C83.088 128.907 82.92 126.293 82.92 124.24C82.92 123.269 83.144 122.56 83.592 122.112C84.0773 121.664 84.8427 121.44 85.888 121.44ZM127.06 121.384C129.561 121.384 131.838 121.701 133.892 122.336C135.945 122.933 137.625 123.829 138.932 125.024C141.284 127.152 142.926 129.485 143.86 132.024C144.83 134.525 145.316 137.736 145.316 141.656C145.316 142.477 145.204 143.224 144.98 143.896C144.793 144.568 144.476 145.427 144.028 146.472C143.468 147.629 143.132 148.544 143.02 149.216C142.273 150.523 141.041 151.773 139.324 152.968C137.644 154.163 135.814 155.133 133.836 155.88C131.857 156.627 130.121 157 128.628 157C121.422 157 116.289 154.536 113.228 149.608C112.369 148.227 111.697 146.789 111.212 145.296C110.764 143.803 110.54 142.347 110.54 140.928C110.54 137.12 111.212 133.816 112.556 131.016C113.937 128.179 115.841 125.976 118.268 124.408C119.724 123.549 121.236 122.84 122.804 122.28C124.409 121.683 125.828 121.384 127.06 121.384ZM116.364 141.096C116.364 143.112 116.812 144.773 117.708 146.08C118.641 147.387 120.06 148.805 121.964 150.336C123.532 150.933 124.596 151.325 125.156 151.512C125.716 151.661 126.35 151.736 127.06 151.736C130.83 151.736 133.836 150.709 136.076 148.656C138.316 146.603 139.436 143.784 139.436 140.2C139.436 137.363 139.118 135.123 138.484 133.48C137.849 131.837 136.71 130.363 135.068 129.056C134.209 128.347 133.108 127.824 131.764 127.488C130.457 127.152 129.038 126.984 127.508 126.984C125.193 126.984 123.196 127.675 121.516 129.056C119.836 130.4 118.548 132.155 117.652 134.32C116.793 136.485 116.364 138.744 116.364 141.096ZM178.894 156.16C178.409 155.525 177.998 154.835 177.662 154.088C177.326 153.304 176.971 152.371 176.598 151.288C176.523 151.101 176.299 150.541 175.926 149.608C175.59 148.675 175.198 147.872 174.75 147.2C172.398 147.536 170.475 147.704 168.982 147.704C168.161 147.704 167.246 147.685 166.238 147.648C165.267 147.573 164.539 147.536 164.054 147.536C162.187 147.387 160.694 147.312 159.574 147.312C159.126 147.909 158.734 148.544 158.398 149.216C158.099 149.888 157.707 150.896 157.222 152.24C156.55 154.181 155.971 155.563 155.486 156.384C155.15 156.944 154.497 157.224 153.526 157.224C152.705 157.224 151.939 157.056 151.23 156.72C150.558 156.347 150.222 155.843 150.222 155.208C150.521 153.789 150.987 152.296 151.622 150.728C152.294 149.123 153.246 146.995 154.478 144.344L156.718 138.856C157.95 135.72 159.07 133.032 160.078 130.792C161.123 128.552 162.486 125.901 164.166 122.84C164.39 122.392 164.763 122.019 165.286 121.72C165.809 121.384 166.387 121.216 167.022 121.216C167.731 121.216 168.235 121.272 168.534 121.384C168.87 121.459 169.131 121.608 169.318 121.832C169.505 122.019 169.785 122.429 170.158 123.064C171.427 125.043 172.51 127.077 173.406 129.168C174.339 131.259 175.515 134.152 176.934 137.848L178.11 140.816C179.155 143.504 180.051 145.763 180.798 147.592C181.582 149.384 182.441 151.027 183.374 152.52C183.971 153.491 184.27 154.163 184.27 154.536C184.27 155.432 183.99 156.123 183.43 156.608C182.907 157.056 182.217 157.28 181.358 157.28C180.275 157.28 179.454 156.907 178.894 156.16ZM173.126 142.608C172.529 141.339 171.67 139.136 170.55 136C169.393 132.64 168.235 129.971 167.078 127.992C166.369 129.784 165.323 132.099 163.942 134.936C163.009 136.691 161.945 139.229 160.75 142.552C163.139 142.851 165.715 143 168.478 143C170.457 143 172.006 142.869 173.126 142.608ZM190.802 154.368C190.802 153.136 190.877 151.773 191.026 150.28C191.176 148.563 191.25 146.397 191.25 143.784C191.25 139.005 191.045 134.395 190.634 129.952C190.41 127.189 190.298 125.229 190.298 124.072C190.298 123.288 190.69 122.635 191.474 122.112C192.258 121.552 193.061 121.272 193.882 121.272C194.405 121.272 195.04 121.309 195.786 121.384C196.533 121.459 197.074 121.496 197.41 121.496C205.81 121.496 211.989 123.755 215.946 128.272C218.448 131.184 219.698 135.048 219.698 139.864C219.698 141.88 219.325 143.915 218.578 145.968C217.869 147.984 216.842 149.627 215.498 150.896C214.042 152.315 212.661 153.453 211.354 154.312C210.085 155.133 208.349 155.824 206.146 156.384C203.981 156.944 201.2 157.224 197.802 157.224C195.637 157.224 193.92 156.981 192.65 156.496C191.418 156.011 190.802 155.301 190.802 154.368ZM199.93 152.128C202.432 152.128 204.728 151.68 206.818 150.784C208.909 149.851 210.589 148.469 211.858 146.64C213.128 144.773 213.762 142.496 213.762 139.808C213.762 137.157 213.389 134.955 212.642 133.2C211.896 131.408 210.608 129.952 208.778 128.832C207.397 127.973 205.698 127.357 203.682 126.984C201.666 126.573 199.24 126.368 196.402 126.368C196.402 126.741 196.44 127.6 196.514 128.944C196.589 130.213 196.626 131.277 196.626 132.136L196.682 133.368C196.906 137.251 197.018 140.331 197.018 142.608C197.018 146.192 196.813 149.291 196.402 151.904C197.298 152.053 198.474 152.128 199.93 152.128ZM235.872 126.088C235.722 129.299 235.648 131.595 235.648 132.976C235.648 136 235.741 139.341 235.928 143C236.077 147.331 236.152 150.541 236.152 152.632C237.57 152.445 238.429 152.352 238.728 152.352C239.549 152.352 240.202 152.557 240.688 152.968C241.173 153.379 241.416 154.013 241.416 154.872C241.416 155.432 241.192 155.861 240.744 156.16C240.296 156.459 239.512 156.683 238.392 156.832C237.309 156.944 235.722 157 233.632 157C231.317 157 229.581 156.925 228.424 156.776C227.266 156.627 226.464 156.347 226.016 155.936C225.568 155.488 225.344 154.835 225.344 153.976C225.344 153.341 225.549 152.912 225.96 152.688C226.37 152.464 226.949 152.352 227.696 152.352L228.872 152.408L230.72 152.52L230.44 145.912C230.216 142.328 230.104 139.043 230.104 136.056C230.104 134.451 230.16 132.248 230.272 129.448L230.384 126.368C229.114 126.443 228.125 126.48 227.416 126.48C226.594 126.48 226.034 126.331 225.736 126.032C225.474 125.733 225.344 125.117 225.344 124.184C225.344 123.139 226.053 122.467 227.472 122.168C228.928 121.869 231.13 121.72 234.08 121.72C236.357 121.72 238.056 121.795 239.176 121.944C240.333 122.093 240.912 122.429 240.912 122.952C240.912 124.221 240.632 125.061 240.072 125.472C239.549 125.845 238.522 126.032 236.992 126.032L235.872 126.088ZM272.274 125.528C272.274 124.445 272.517 123.512 273.002 122.728C273.525 121.907 274.29 121.496 275.298 121.496C276.157 121.496 276.922 121.664 277.594 122C278.266 122.336 278.602 122.896 278.602 123.68C278.602 125.211 278.528 127.357 278.378 130.12C278.229 132.808 278.154 134.805 278.154 136.112C278.154 138.165 278.229 140.909 278.378 144.344C278.528 147.629 278.602 150.037 278.602 151.568C278.602 152.8 278.584 153.715 278.546 154.312C278.546 154.909 278.21 155.507 277.538 156.104C276.904 156.664 275.914 156.944 274.57 156.944C273.861 156.944 273.245 156.832 272.722 156.608C272.237 156.347 271.901 156.067 271.714 155.768C269.96 153.64 267.402 150.019 264.042 144.904C260.272 139.192 257.192 134.824 254.802 131.8C255.101 134.488 255.25 137.773 255.25 141.656C255.25 143.373 255.213 145.613 255.138 148.376C255.101 151.101 255.026 152.893 254.914 153.752C254.765 154.835 254.429 155.675 253.906 156.272C253.421 156.832 252.637 157.112 251.554 157.112C250.733 157.112 250.117 156.888 249.706 156.44C249.333 155.955 249.109 155.133 249.034 153.976C248.997 152.445 249.09 150.149 249.314 147.088C249.352 146.603 249.408 145.763 249.482 144.568C249.557 143.373 249.594 142.309 249.594 141.376C249.594 138.8 249.464 135.851 249.202 132.528C248.978 128.869 248.866 126.163 248.866 124.408C248.866 123.512 249.184 122.821 249.818 122.336C250.49 121.851 251.256 121.608 252.114 121.608C252.861 121.608 253.645 121.795 254.466 122.168C257.677 126.2 262.026 132.211 267.514 140.2L272.778 148.264C272.816 147.667 272.834 146.827 272.834 145.744C272.834 143.84 272.797 141.787 272.722 139.584C272.648 137.381 272.592 135.888 272.554 135.104C272.368 131.483 272.274 128.291 272.274 125.528ZM313.479 130.064C311.874 128.907 310.493 128.067 309.335 127.544C308.178 126.984 306.834 126.704 305.303 126.704C302.242 126.704 299.61 127.488 297.407 129.056C295.727 130.288 294.477 131.893 293.655 133.872C292.834 135.851 292.423 138.072 292.423 140.536C292.423 142.888 292.965 144.96 294.047 146.752C295.13 148.507 296.53 149.851 298.247 150.784C299.965 151.717 301.757 152.184 303.623 152.184C305.49 152.184 307.095 151.904 308.439 151.344C309.821 150.747 310.922 149.981 311.743 149.048C313.013 147.443 313.647 145.315 313.647 142.664C313.647 142.291 313.349 142.029 312.751 141.88C312.154 141.731 311.295 141.656 310.175 141.656L306.143 141.712C305.061 141.712 304.202 141.507 303.567 141.096C302.933 140.685 302.615 140.163 302.615 139.528C302.615 138.632 302.914 137.979 303.511 137.568C304.109 137.12 304.911 136.896 305.919 136.896C307.114 136.896 308.719 136.971 310.735 137.12C312.751 137.269 314.207 137.344 315.103 137.344C316.41 137.344 317.455 137.755 318.239 138.576C319.061 139.397 319.471 140.592 319.471 142.16C319.471 143.616 319.154 145.315 318.519 147.256C317.885 149.197 316.989 150.933 315.831 152.464C314.711 153.957 313.05 155.096 310.847 155.88C308.682 156.627 306.274 157 303.623 157C301.421 157 299.293 156.645 297.239 155.936C295.186 155.227 293.469 154.237 292.087 152.968C290.37 151.363 289.007 149.459 287.999 147.256C287.029 145.016 286.543 142.795 286.543 140.592C286.543 137.381 287.29 134.264 288.783 131.24C290.314 128.179 292.367 125.808 294.943 124.128C296.063 123.381 297.631 122.765 299.647 122.28C301.663 121.795 303.511 121.552 305.191 121.552C307.805 121.552 310.101 121.963 312.079 122.784C314.058 123.568 315.57 124.707 316.615 126.2C317.063 126.872 317.287 127.469 317.287 127.992C317.287 128.589 317.026 129.149 316.503 129.672C315.981 130.195 315.458 130.456 314.935 130.456C314.711 130.456 314.45 130.419 314.151 130.344C313.853 130.269 313.629 130.176 313.479 130.064Z"
            fill="#1d1a46"
          />
          <motion.path
            variants={dotsAnimation}
            initial="start"
            animate="end"
            custom={1}
            transition={{
              //delay: i * 0.1,
              duration: 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            d="M339.879 143.023C339.314 143.643 339.031 144.427 339.031 145.375C339.031 145.831 339.104 146.268 339.25 146.688C339.414 147.089 339.633 147.444 339.906 147.754C340.18 148.046 340.49 148.283 340.836 148.465C341.201 148.647 341.592 148.738 342.012 148.738C342.413 148.738 342.786 148.647 343.133 148.465C343.497 148.283 343.816 148.046 344.09 147.754C344.363 147.444 344.573 147.089 344.719 146.688C344.883 146.268 344.965 145.831 344.965 145.375C344.965 144.919 344.883 144.491 344.719 144.09C344.573 143.689 344.363 143.333 344.09 143.023C343.816 142.714 343.497 142.467 343.133 142.285C342.786 142.103 342.413 142.012 342.012 142.012C341.191 142.012 340.48 142.349 339.879 143.023ZM342.395 140.891C346.496 140.891 348.547 142.385 348.547 145.375C348.547 148.365 346.496 149.859 342.395 149.859C341.793 149.859 341.219 149.741 340.672 149.504C340.143 149.267 339.669 148.948 339.25 148.547C338.849 148.146 338.521 147.672 338.266 147.125C338.029 146.578 337.91 145.995 337.91 145.375C337.91 144.755 338.029 144.172 338.266 143.625C338.503 143.078 338.822 142.604 339.223 142.203C339.642 141.802 340.125 141.483 340.672 141.246C341.219 141.009 341.793 140.891 342.395 140.891Z"
            fill="#1d1a46"
          />
          <motion.path
            variants={dotsAnimation}
            initial="start"
            animate="end"
            custom={2}
            d="M363.879 143.023C363.314 143.643 363.031 144.427 363.031 145.375C363.031 145.831 363.104 146.268 363.25 146.688C363.414 147.089 363.633 147.444 363.906 147.754C364.18 148.046 364.49 148.283 364.836 148.465C365.201 148.647 365.592 148.738 366.012 148.738C366.413 148.738 366.786 148.647 367.133 148.465C367.497 148.283 367.816 148.046 368.09 147.754C368.363 147.444 368.573 147.089 368.719 146.688C368.883 146.268 368.965 145.831 368.965 145.375C368.965 144.919 368.883 144.491 368.719 144.09C368.573 143.689 368.363 143.333 368.09 143.023C367.816 142.714 367.497 142.467 367.133 142.285C366.786 142.103 366.413 142.012 366.012 142.012C365.191 142.012 364.48 142.349 363.879 143.023ZM366.395 140.891C370.496 140.891 372.547 142.385 372.547 145.375C372.547 148.365 370.496 149.859 366.395 149.859C365.793 149.859 365.219 149.741 364.672 149.504C364.143 149.267 363.669 148.948 363.25 148.547C362.849 148.146 362.521 147.672 362.266 147.125C362.029 146.578 361.91 145.995 361.91 145.375C361.91 144.755 362.029 144.172 362.266 143.625C362.503 143.078 362.822 142.604 363.223 142.203C363.642 141.802 364.125 141.483 364.672 141.246C365.219 141.009 365.793 140.891 366.395 140.891Z"
            fill="#1d1a46"
          />
          <motion.path
            variants={dotsAnimation}
            initial="start"
            animate="end"
            custom={3}
            d="M387.879 143.023C387.314 143.643 387.031 144.427 387.031 145.375C387.031 145.831 387.104 146.268 387.25 146.688C387.414 147.089 387.633 147.444 387.906 147.754C388.18 148.046 388.49 148.283 388.836 148.465C389.201 148.647 389.592 148.738 390.012 148.738C390.413 148.738 390.786 148.647 391.133 148.465C391.497 148.283 391.816 148.046 392.09 147.754C392.363 147.444 392.573 147.089 392.719 146.688C392.883 146.268 392.965 145.831 392.965 145.375C392.965 144.919 392.883 144.491 392.719 144.09C392.573 143.689 392.363 143.333 392.09 143.023C391.816 142.714 391.497 142.467 391.133 142.285C390.786 142.103 390.413 142.012 390.012 142.012C389.191 142.012 388.48 142.349 387.879 143.023ZM390.395 140.891C394.496 140.891 396.547 142.385 396.547 145.375C396.547 148.365 394.496 149.859 390.395 149.859C389.793 149.859 389.219 149.741 388.672 149.504C388.143 149.267 387.669 148.948 387.25 148.547C386.849 148.146 386.521 147.672 386.266 147.125C386.029 146.578 385.91 145.995 385.91 145.375C385.91 144.755 386.029 144.172 386.266 143.625C386.503 143.078 386.822 142.604 387.223 142.203C387.642 141.802 388.125 141.483 388.672 141.246C389.219 141.009 389.793 140.891 390.395 140.891Z"
            fill="#1d1a46"
          />
        </g>
        <defs>
          <clipPath id="clip0_3_27">
            <rect width="411" height="177" fill="white" />
          </clipPath>
        </defs>
      </motion.svg>
    </motion.div>
  );
}

export default Loader;
