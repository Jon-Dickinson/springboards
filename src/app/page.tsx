"use client";

import MultiStepForm from './components/MultiStepForm';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export default function Home() {
  return (
    <Container>
      <MultiStepForm />
    </Container>
  );
}
