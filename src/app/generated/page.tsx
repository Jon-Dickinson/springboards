// src/app/generated/page.tsx

"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import IndustryResearch from '../components/IndustryResearch';
import styled from '@emotion/styled';

const Container = styled.div`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  > div {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #ffffff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const GeneratedPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<unknown | null>(null);

  useEffect(() => {
    const storedFormData = sessionStorage.getItem('formData');
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    } else {
      router.push('/');
    }
  }, [router]);

  return (
    <Container>
      {!formData ? (
        <Spinner />
      ) : (
        <IndustryResearch formData={formData} />
      )}
    </Container>
  );
};

export default GeneratedPage;
