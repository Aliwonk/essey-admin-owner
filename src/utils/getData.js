// eslint-disable-next-line consistent-return
export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export function getParamsUrlFromWindow() {
  const params = window.location.search
    .replace('?', '')
    .split('&')
    .reduce(function (p, e) {
      const a = e.split('=');
      p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
      return p;
    }, {});
  return params;
}
