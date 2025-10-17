import { useEffect, useState } from "react";

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // ✅ Detect if user is on iOS
    const iOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setIsIOS(iOS);

    // ✅ Detect if app is already installed
    const isInStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    setIsInstalled(isInStandaloneMode);

    // ✅ Listen for Android install prompt
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  // ✅ If already installed, don’t show anything
  if (isInstalled) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      {isIOS ? (
        <div className="bg-white border border-gray-300 rounded-xl shadow-md px-4 py-3 text-sm text-gray-700 max-w-[280px] text-center">
          📱 لإضافة التطبيق للشاشة الرئيسية:
          <br />
          اضغط على <span className="font-bold">مشاركة (Share)</span> ثم{" "}
          <span className="font-bold">Add to Home Screen</span>
        </div>
      ) : (
        isVisible && (
          <button
            onClick={handleInstall}
            className="bg-purple-600 text-white px-4 py-2 rounded-xl shadow-lg hover:bg-purple-700 transition"
          >
            📲 أضف التطبيق للشاشة الرئيسية
          </button>
        )
      )}
    </div>
  );
}
