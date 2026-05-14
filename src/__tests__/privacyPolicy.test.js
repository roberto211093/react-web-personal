import React from 'react';
import { renderToString } from 'react-dom/server';
import PrivacyPolicy from '../pages/PrivacyPolicy';

describe('Privacy Policy component', () => {
  test('renders privacy policy content to string', () => {
    const html = renderToString(<PrivacyPolicy />);
    expect(html).toMatch(/Términos y Condiciones/i);
  });
});
