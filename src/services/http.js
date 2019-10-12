import endpoints from 'config/endpoints';

export default class RestAPI {
  static call = async ({
    endpoint,
    data = null,
    onSuccess = () => null,
    onFail = () => null,
    urlSuffix = '',
  }) => {
    const xhr = new XMLHttpRequest();
    xhr.open(endpoint[0], endpoints.base_api + endpoint[1] + urlSuffix);
    const requestHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    for (let header in requestHeaders) {
      xhr.setRequestHeader(header, requestHeaders[header]);
    }

    xhr.onload = ({ target }) => {
      if (target.status > 299 || target.status < 200) {
        onFail(target);
        return;
      }
      onSuccess(JSON.parse(target.responseText));
    };

    xhr.onerror = onFail;
    !!data ? xhr.send(JSON.stringify(data)) : xhr.send();
  };
}
