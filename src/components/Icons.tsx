import React from 'react';
import styled, { keyframes } from 'styled-components';

const Svg = styled.svg`
  width: 100px;
  display: block;
  margin: 40px auto 0;
`;

const dash = keyframes`
  0% {
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

const dashCheck = keyframes`
  0% {
    stroke-dashoffset: -100;
  }
  100% {
    stroke-dashoffset: 900;
  }
`;

const Path = styled.path<{ className: string }>`
  stroke-dasharray: 1000;
  stroke-dashoffset: 0;
  &.circle {
    animation: ${dash} 0.9s ease-in-out;
  }
  &.line {
    stroke-dashoffset: 1000;
    animation: ${dash} 0.9s 0.35s ease-in-out forwards;
  }
  &.check {
    stroke-dashoffset: -100;
    animation: ${dashCheck} 0.9s 0.35s ease-in-out forwards;
  }
`;

const Text = styled.p`
  text-align: center;
  margin: 20px 0 60px;
  font-size: 1.25em;
  &.success {
    color: #73AF55;
  }
  &.error {
    color: #D06079;
  }
`;

interface SuccessIconProps {
  title: string;
}

const SuccessIcon: React.FC<SuccessIconProps> = ({ title }) => (
  <>
    <Svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
      <Path className="circle" fill="none" stroke="#73AF55" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
      <Path className="check" fill="none" stroke="#73AF55" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" d="M100.2,40.2 51.5,88.8 29.8,67.5" />
    </Svg>
    <Text className="success">{`Welcome ${title}`}</Text>
  </>
);

interface ErrorIconProps {
  title: string;
}

const ErrorIcon: React.FC<ErrorIconProps> = ({ title }) => (
  <>
    <Svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
      <Path className="circle" fill="none" stroke="#D06079" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
      <Path className="line" fill="none" stroke="#D06079" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" d="M34.4,37.9 95.8,92.3" />
      <Path className="line" fill="none" stroke="#D06079" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" d="M95.8,38 34.4,92.2" />
    </Svg>
    <Text className="error">{title}</Text>
  </>
);

export { SuccessIcon, ErrorIcon };
