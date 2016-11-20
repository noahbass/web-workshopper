'use strict';

onmessage = event => {
  const request = event.data.request;

  // TODO: find a better way to do this
  const response = eval(request);

  postMessage({ status: 'ok', response: response });
}
