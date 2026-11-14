import { useEffect, useRef, useState } from 'react';
import { Download, MoreVertical, Share, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone);

const isIos = () =>
  /iphone|ipad|ipod/i.test(window.navigator.userAgent) ||
  (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);

export default function InstallButton({ compact = false }: { compact?: boolean }) {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(isStandalone);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const handlePrompt = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
    };
    const handleInstalled = () => {
      setInstalled(true);
      setOpen(false);
    };

    window.addEventListener('beforeinstallprompt', handlePrompt);
    window.addEventListener('appinstalled', handleInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handlePrompt);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  if (installed) return null;

  const installNow = async () => {
    if (!promptEvent) return;
    await promptEvent.prompt();
    const choice = await promptEvent.userChoice;
    if (choice.outcome === 'accepted') {
      setInstalled(true);
      setOpen(false);
    }
    setPromptEvent(null);
  };

  return (
    <>
      <button
        type="button"
        className={`btn btn--secondary btn--small install-trigger ${compact ? 'install-trigger--compact' : ''}`}
        onClick={() => setOpen(true)}
      >
        <Download size={17} aria-hidden="true" />
        <span>Install</span>
      </button>

      <dialog
        ref={dialogRef}
        className="install-dialog"
        aria-labelledby="install-title"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setOpen(false);
        }}
      >
        <div className="install-dialog__panel">
          <button
            type="button"
            className="icon-button install-dialog__close"
            onClick={() => setOpen(false)}
            aria-label="Close install instructions"
          >
            <X size={20} />
          </button>

          <div className="install-dialog__mark" aria-hidden="true">
            <Download size={28} />
          </div>
          <p className="eyebrow">Keep it close</p>
          <h2 id="install-title">Install Orchard Home Gnome</h2>
          <p className="install-dialog__intro">
            Add the guide to your home screen and open it like an app, even when the signal is
            patchy.
          </p>

          {promptEvent ? (
            <button type="button" className="btn btn--primary btn--full" onClick={installNow}>
              <Download size={18} aria-hidden="true" />
              Install now
            </button>
          ) : isIos() ? (
            <ol className="install-steps">
              <li>
                <span className="install-steps__icon">
                  <Share size={18} aria-hidden="true" />
                </span>
                <span>
                  Tap the <strong>Share</strong> button in Safari.
                </span>
              </li>
              <li>
                <span className="install-steps__icon">
                  <span aria-hidden="true">+</span>
                </span>
                <span>
                  Choose <strong>Add to Home Screen</strong>.
                </span>
              </li>
              <li>
                <span className="install-steps__icon">
                  <Download size={18} aria-hidden="true" />
                </span>
                <span>
                  Tap <strong>Add</strong>. The gnome will be waiting on your home screen.
                </span>
              </li>
            </ol>
          ) : (
            <ol className="install-steps">
              <li>
                <span className="install-steps__icon">
                  <MoreVertical size={18} aria-hidden="true" />
                </span>
                <span>
                  Open your browser menu and look for <strong>Install app</strong> or{' '}
                  <strong>Add to Home screen</strong>.
                </span>
              </li>
              <li>
                <span className="install-steps__icon">
                  <Download size={18} aria-hidden="true" />
                </span>
                <span>Confirm the install and open it from your home screen or app list.</span>
              </li>
            </ol>
          )}

          <p className="install-dialog__note">
            Installation works in supported browsers. This prototype still runs in the browser if
            your device does not offer it.
          </p>
        </div>
      </dialog>
    </>
  );
}
