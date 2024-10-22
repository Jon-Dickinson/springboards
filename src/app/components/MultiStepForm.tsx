"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '../images/logo.png';
import ufo from '../images/ufo.png';
import styled from '@emotion/styled';

const animFadeIn = `
  @keyframes animFadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`;

const Container = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(180deg, #062E4F, #070B14);
`;

const MidContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
`;

const ThreeDContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 500px;
  perspective: 1000px; /* Provides depth for the 3D effect */
`;

const ThreeDPanel = styled.div<{ step: number; animating: boolean }>`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 400px;
  transition: transform 1s ease, opacity 0.25s ease;
  transform-style: preserve-3d;
  opacity: ${(props) => (props.animating ? 0 : 1)};
  animation: ${animFadeIn} 1s forwards;

  ${(props) =>
    props.step === 1 &&
    props.animating &&
    `
    transform: rotateX(-45deg) translateZ(-500px) translateY(-800px);
  `}

  ${(props) =>
    props.step === 2 &&
    props.animating &&
    `
    transform: rotateX(-45deg) translateZ(-500px) translateY(-800px);
  `}

  ${(props) =>
    props.step === 3 &&
    props.animating &&
    `
    transform: rotateX(-45deg) translateZ(-500px) translateY(-800px);
  `}
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  text-align: center;
  color: #ffffff;
  font-weight: 500;
`;

const Description = styled.p`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: #ffffff;
  font-weight: 300;
`;

const Form = styled.form`
  position: relative;
  z-index: 100;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 48px;
  max-height: 48px;
  width: 100%;
  padding: 0 20px;
  margin-top: 40px;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #999;
  background-color: #ffffff;
  color: #000000;
  margin-right: 10px;
  padding: 0 15px;
  font-size: 16px;
  min-height: 56px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #00629F;
  min-height: 56px;
  min-width: 108px;
  font-size: 18px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #005bb5;
  }
`;

export default function MultiStepForm() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [animating, setAnimating] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    client_name: '',
    industry_name: '',
    industry_description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAnimating(true);

    setTimeout(async () => {
      if (step < 3) {
        setStep(step + 1);
      } else {
        sessionStorage.setItem('formData', JSON.stringify(formData));
        router.push('/generated');
      }
      setAnimating(false);
    }, 1000);
  };

  return (
    <Container>
      <Image src={logo} alt="Logo" className="logo" />
      <Image src={ufo} alt="UFO" className="ufo" />
      <MidContainer>
        <ThreeDContainer>
          {step === 1 && (
            <ThreeDPanel step={step} animating={animating}>
              <Title>Welcome to Springboards</Title>
              <Description>
                Streamline your research process with our innovative automation
                tools, allowing you to focus on insights and decisions while we
                handle the rest.
              </Description>
              <Form onSubmit={handleSubmit}>
                <Input
                  type="text"
                  name="client_name"
                  placeholder="Enter client name"
                  value={formData.client_name}
                  onChange={handleInputChange}
                  required
                />
                <Button type="submit">Next</Button>
              </Form>
            </ThreeDPanel>
          )}

          {step === 2 && (
            <ThreeDPanel step={step} animating={animating}>
              <Title>You’re on your way</Title>
              <Form onSubmit={handleSubmit}>
                <Input
                  type="text"
                  name="industry_name"
                  placeholder="Enter industry name"
                  value={formData.industry_name}
                  onChange={handleInputChange}
                  required
                />
                <Button type="submit">Next</Button>
              </Form>
            </ThreeDPanel>
          )}

          {step === 3 && (
            <ThreeDPanel step={step} animating={animating}>
              <Title>Almost there!</Title>
              <Form onSubmit={handleSubmit}>
                <Input
                  type="text"
                  name="industry_description"
                  placeholder="Enter industry description"
                  value={formData.industry_description}
                  onChange={handleInputChange}
                  required
                />
                <Button type="submit">Submit</Button>
              </Form>
            </ThreeDPanel>
          )}
        </ThreeDContainer>
      </MidContainer>
    </Container>
  );
}
