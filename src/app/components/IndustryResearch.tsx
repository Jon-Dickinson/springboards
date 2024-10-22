"use client";

import { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

const BaseSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
`;

const InnerSpinner = styled.div`
  position: relative;
  border: 4px solid #00629F30;
  border-top: 4px solid #00629F;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const IndustryResearch = ({ formData }: { formData: unknown }) => {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchHtmlContent = async () => {
      try {
        const response = await fetch('http://54.171.69.64/industry', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          let html = await response.text();

          html = html
            .replace(/href="(globals.css|styleguide.css|style.css)"/g, 'href="/generated/styles/$1"')
            .replace(/src="img\/(.*?)"/g, 'src="/generated/img/$1"');

          setHtmlContent(html);
        } else {
          setError('Failed to fetch data.');
        }
      } catch (err) {
        console.error('Error fetching HTML:', err);
        setError('An error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchHtmlContent();
  }, [formData]);

  return (
    <>
      {loading && <BaseSpinner> <InnerSpinner> </InnerSpinner> </BaseSpinner>}
      {error && <p>{error}</p>}
      {htmlContent && (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      )}
    </>
  );
};

export default IndustryResearch;
