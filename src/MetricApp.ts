import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class MetricApp extends LitElement {

  @property({ type: Number }) temperature = 0;
  busyIndicator = false;

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--metric-app-background-color);
    }

    main {
      flex-grow: 1;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }`;

    override connectedCallback():void {
      super.connectedCallback()
      this.addData()
    }

    async addData():Promise<void> {
      this.busyIndicator = true

      try {
          const response = await fetch("./current_temp.json")
          const data = await response.json()
          this.temperature = Math.round(data.temp_au*100)/100
      } finally {
          this.busyIndicator = false
      }
    }

  render() {
    return html`
      <main>
        <h1>${this.temperature} °C</h1>

        <p class="app-footer">Temperature proudly read by some self-soldered thing ❤ attached to the heating</p>
      </main>
    `;
  }
}
