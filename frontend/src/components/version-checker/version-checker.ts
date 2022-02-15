type OnVersionFn = (isDifferent: boolean) => void;

export class VersionChecker {
  private events: EventSource | undefined;
  private onVersion: OnVersionFn;
  private version: string | undefined = process.env.VERSION;

  constructor(onVersion: OnVersionFn) {
    this.onVersion = onVersion;

    console.log('CURRENT VERSION', this.version ?? 'UNKNOWN');

    this.getEventSource();
  }

  private delay = 0;

  private getEventSource() {
    const events = new EventSource('/version');

    events.addEventListener('error', () => {
      if (events.readyState === EventSource.CLOSED) {
        if (this.delay === 0) {
          this.getEventSource();
        } else {
          setTimeout(this.getEventSource.bind(this), this.delay);
        }

        this.delay = this.delay === 0 ? 500 : Math.min(this.delay + 500, 10000);
      }
    });

    events.addEventListener('open', () => {
      this.delay = 0;
    });

    events.addEventListener('message', ({ data }) => {
      console.log('VERSION', data);
      this.onVersion(data !== this.version);
    });

    this.events = events;
  }

  public close() {
    this.events?.close();
  }
}
