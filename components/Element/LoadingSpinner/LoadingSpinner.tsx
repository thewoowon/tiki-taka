// components/LoadingSpinner.js
import styled from "@emotion/styled";

const LoadingSpinner = () => {
  return (
    <Container>
      <Debounce1 />
      <Debounce2 />
    </Container>
  );
};

export default LoadingSpinner;

/* components/LoadingSpinner.module.css */
const Container = styled.div`
  width: 40px;
  height: 40px;

  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -20px;
  margin-left: -20px;

  z-index: 1001;
`;

const Debounce1 = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #333;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  animation: bounce 2s infinite ease-in-out;

  @keyframes bounce {
    0%,
    100% {
      transform: scale(0);
    }
    50% {
      transform: scale(1);
    }
  }
`;

const Debounce2 = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #333;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  animation: bounce 2s infinite ease-in-out;
  animation-delay: -1s;

  @keyframes bounce {
    0%,
    100% {
      transform: scale(0);
    }
    50% {
      transform: scale(1);
    }
  }
`;
