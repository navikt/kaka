import { ENVIRONMENT } from '@app/environment';
import { getQueryParams } from '@app/headers';

type OnVersionFn = (isDifferent: boolean) => void;

export class VersionChecker {
  private events: EventSource | undefined;
  private onVersion: OnVersionFn;
  private version: string | undefined = ENVIRONMENT.version;

  constructor(onVersion: OnVersionFn) {
    this.onVersion = onVersion;

    console.info('CLIENT VERSION', this.version ?? 'UNKNOWN');

    this.getEventSource();
  }

  private delay = 0;

  private getEventSource() {
    const events = new EventSource(`/version?${getQueryParams()}`);

    events.addEventListener('error', () => {
      if (events.readyState === EventSource.CLOSED) {
        if (this.delay === 0) {
          this.getEventSource();
        } else {
          setTimeout(this.getEventSource.bind(this), this.delay);
        }

        this.delay = this.delay === 0 ? 500 : Math.min(this.delay + 500, 10_000);
      }
    });

    events.addEventListener('open', () => {
      this.delay = 0;
    });

    events.addEventListener('message', ({ data }) => {
      console.info('SERVER VERSION', data);
      this.onVersion(data !== this.version);
    });

    this.events = events;
  }

  public close() {
    this.events?.close();
  }
}
