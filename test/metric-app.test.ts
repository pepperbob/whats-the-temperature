import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import { MetricApp } from '../src/MetricApp.js';
import '../src/metric-app.js';

describe('MetricApp', () => {
  let element: MetricApp;
  beforeEach(async () => {
    element = await fixture(html`<metric-app></metric-app>`);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('My app');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
