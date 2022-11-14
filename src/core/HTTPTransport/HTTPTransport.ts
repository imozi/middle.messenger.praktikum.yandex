enum Method {
  Get = 'Get',
  Post = 'Post',
  Put = 'Put',
  Patch = 'Patch',
  Delete = 'Delete',
}

type Options<T = any> = Record<string, T>;
type Data<T = any> = T;

export class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';

  protected endpoint: string;

  protected options: Options;

  constructor(
    endpoint: string,
    options: Options = {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
    this.options = options;
  }

  public get<Response>(path: string, data?: Data): Promise<Response> {
    return this._request<Response>(Method.Get, path, data);
  }

  public post<Response>(path: string, data?: Data): Promise<Response> {
    return this._request(Method.Post, path, data);
  }

  public put<Response>(path: string, data: Data): Promise<Response> {
    return this._request(Method.Put, path, data);
  }

  public delete<Response>(path: string, data: Data): Promise<Response> {
    return this._request(Method.Delete, path, data);
  }

  private _request<Response>(
    method: Method,
    path: string,
    data?: Data,
  ): Promise<Response> {
    return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, `${this.endpoint}${path}`);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            res(xhr.response);
          } else {
            rej(xhr.response);
          }
        }
      };

      xhr.onabort = () => rej({ reason: 'Запрос был отменён!' });
      xhr.onerror = () => rej({ reason: 'Произошла ошибка!' });
      xhr.ontimeout = () => rej({ reason: 'Запрос занимает много времени!' });

      if (!(data instanceof FormData)) {
        Object.keys(this.options.headers).forEach((key) => {
          xhr.setRequestHeader(key, this.options.headers[key]);
        });
      }

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === Method.Get || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
