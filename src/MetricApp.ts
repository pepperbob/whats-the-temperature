import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class MetricApp extends LitElement {

  @property({ type: Number })
  temperature: Number | null = null;

  @property({ type: Number})
  dcRoof: Number | null = null;

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

    .temp, .kwh {
      margin: 20 50 10 50;
      padding-top: 25px;
      padding-bottom: 25px;
      font-size: 2em;
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
        // Give the browser a chance to paint
      await new Promise((r) => setTimeout(r, 0));

      this.busyIndicator = !this.temperature

      try {
          const response = await fetch("./current_temp.json")
          const data = await response.json()
          this.temperature = Math.round(data.temp_au*100)/100
          this.dcRoof = Math.round(data.dc_roof)


          setTimeout(() => this.addData(), 10000);
      } finally {
          this.busyIndicator = false
      }
    }

    iconTemp() {
      if(!this.temperature) {
        return "🙃"
      } else if (this.temperature <= 0) {
        return "🥶"
      } else if (this.temperature <= 10) {
        return "🤧"
      } else if (this.temperature <= 20) {
        return "🤠"
      } else if (this.temperature <= 30) {
        return "😊"
      }else if (this.temperature <= 40) {
        return "🔥"
      }
      return "😲"
    }

    iconDc() {
      if(this.dcRoof == null) {
        return "🙃"
      } else if (this.dcRoof <= 500) {
        return "🌛"
      } else if (this.dcRoof <= 2000) {
        return "☁️"
      } else if (this.dcRoof <= 5000) {
        return "⛅"
      } else if (this.dcRoof <= 8000) {
        return "🌞"
      }else if (this.dcRoof <= 11000) {
        return "🌞🌞"
      }
      return "😲"
    }

  render() {
    return html`
      <main>
        <h1>Clues on the weather...</h1>

        <div class="temp">
          ${this.iconTemp()}
          ${this.temperature} °C
        </div>

        <div class="kwh">
          ${this.iconDc()}
          ${this.dcRoof} Wh
        </div>

        <p class="app-footer">proudly ❤ made with lit framework, all the cloud stuff, iot and a solder iron</p>
      </main>
    `;
  }
}
