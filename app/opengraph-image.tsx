/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "tikitaka";
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <svg
        width="226"
        height="100"
        viewBox="0 0 226 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.5" y="0.5" width="225" height="99" fill="white" />
        <rect x="0.5" y="0.5" width="225" height="99" stroke="black" />
        <path
          d="M69.0004 53.6967C69.0004 61.3773 62.7611 67.6076 55.0537 67.6076H44.9466C37.2463 67.6076 31 61.3843 31 53.6967C31 46.0162 37.2393 39.7859 44.9466 39.7859H55.0537C62.754 39.7859 69.0004 46.0091 69.0004 53.6967Z"
          fill="url(#paint0_linear_324_141)"
        />
        <path
          d="M64.2503 54.036C64.2503 58.1616 61.0458 61.5004 57.0861 61.5004H42.9142C38.9545 61.5004 35.75 58.1546 35.75 54.036C35.75 49.9104 38.9545 46.5717 42.9142 46.5717H57.0861C61.0458 46.5717 64.2503 49.9175 64.2503 54.036Z"
          fill="white"
        />
        <rect
          x="43.2139"
          y="51.3217"
          width="3.39289"
          height="5.42863"
          rx="1.69645"
          fill="black"
        />
        <rect
          x="53.3926"
          y="51.3217"
          width="3.39289"
          height="5.42863"
          rx="1.69645"
          fill="black"
        />
        <path
          d="M56.7716 38.4286C56.5109 35.3943 53.5707 33 49.9931 33C46.4155 33 43.4753 35.3943 43.2146 38.4286L56.7861 38.4286L56.7716 38.4286Z"
          fill="#78F42B"
        />
        <path
          d="M171.687 61.2687L166.204 56.3576C166.204 56.3576 168.895 54.6421 171.249 51.7156L166.204 51.8837L165.867 46.3671L174.209 46.6362C174.445 45.9971 174.613 45.3243 174.748 44.6179L167.045 45.0552V38.5295H183.426C183.426 53.4647 171.687 61.2687 171.687 61.2687ZM184.065 36.6458H193.275V45.1225L195.999 44.988V53.8684L193.275 53.7675V63.3543C191.895 63.287 190.584 63.2534 189.474 63.2534C187.253 63.2534 185.773 63.3543 185.773 63.3543H185.605V40.4468L184.065 36.6458Z"
          fill="#121212"
        />
        <path
          d="M142.318 60.1923C137.441 60.1923 135.321 58.2413 135.321 54.2384V42.2633L133.681 38.5295H151.434V44.2143L143.025 43.9452V46.1653L151.468 45.8962L151.131 51.4128L143.025 51.1773V52.3883C143.025 53.5656 143.529 53.6666 144.336 53.6666C147.397 53.6666 151.905 53.3302 151.905 53.3302L151.636 60.1923H142.318ZM152.342 36.6458H161.552V45.1225L164.276 44.988V53.8684L161.552 53.7675V63.3543C157.347 63.1525 153.882 63.3543 153.882 63.3543V40.4468L152.342 36.6458Z"
          fill="#121212"
        />
        <path
          d="M111.035 61.2687L105.552 56.3576C105.552 56.3576 108.243 54.6421 110.598 51.7156L105.552 51.8837L105.216 46.3671L113.558 46.6362C113.793 45.9971 113.962 45.3243 114.096 44.6179L106.393 45.0552V38.5295H122.775C122.775 53.4647 111.035 61.2687 111.035 61.2687ZM123.414 36.6458H132.623V63.3543C131.244 63.287 129.932 63.2534 128.822 63.2534C126.602 63.2534 125.122 63.3543 125.122 63.3543H124.954V40.4468L123.414 36.6458Z"
          fill="#121212"
        />
        <path
          d="M84.6375 60.1923C79.76 60.1923 77.6408 58.2413 77.6408 54.2384V42.2633L76 38.5295H93.7534V44.2143L85.3439 43.9452V46.1653L93.787 45.8962L93.4506 51.4128L85.3439 51.1773V52.3883C85.3439 53.5656 85.8484 53.6666 86.6558 53.6666C89.7168 53.6666 94.2243 53.3302 94.2243 53.3302L93.9552 60.1923H84.6375ZM94.6616 36.6458H103.871V63.3543C99.6662 63.1525 96.2015 63.3543 96.2015 63.3543V40.4468L94.6616 36.6458Z"
          fill="#121212"
        />
        <defs>
          <linearGradient
            id="paint0_linear_324_141"
            x1="50.0002"
            y1="39.7859"
            x2="50.0002"
            y2="67.6076"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#78F42B" />
            <stop offset="1" stopColor="#00E0FF" />
          </linearGradient>
        </defs>
      </svg>
    ),
    {}
  );
}