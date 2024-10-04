// Detects mobile devices
export function isMobile(): boolean {
  const userAgent = navigator.userAgent.toLowerCase();
  if (
    userAgent.match(/Android/i) ||
    userAgent.match(/webOS/i) ||
    userAgent.match(/avantgo/i) ||
    userAgent.match(/iPhone/i) ||
    userAgent.match(/iPad/i) ||
    userAgent.match(/iPod/i) ||
    userAgent.match(/BlackBerry/i) ||
    userAgent.match(/bolt/i) ||
    userAgent.match(/Windows Phone/i) ||
    userAgent.match(/Phone/i)
  ) {
    return true;
  }
  return false;
}
