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
  private API_URL = 'https://ya-praktikum.tech/api/v2';

  protected endpoint: string;

  protected options: Options;

  constructor(
    endpoint: string,
    options: Options = {
      headers: { 'Content-Type': 'application/json' },
    },
  ) {
    this.endpoint = `${this.API_URL}${endpoint}`;
    this.options = options;
  }

  public get<Response>(): Promise<Response> {
    return this._request<Response>(Method.Get);
  }

  public post<Response>(data: Data): Promise<Response> {
    return this._request(Method.Post, data);
  }

  public put<Response>(data: Data): Promise<Response> {
    return this._request(Method.Put, data);
  }

  public delete<Response>(data: Data): Promise<Response> {
    return this._request(Method.Delete, data);
  }

  private _request<Response>(method: Method, data?: Data): Promise<Response> {
    return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, this.endpoint);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            res(xhr.response);
          }
        }
      };

      xhr.onabort = () => rej({ reason: 'Запрос был отменён!' });
      xhr.onerror = () => rej({ reason: 'Произошла ошибка!' });
      xhr.ontimeout = () => rej({ reason: 'Запрос занимает много времени!' });

      Object.keys(this.options.headers).forEach((key) => {
        xhr.setRequestHeader(key, this.options.headers[key]);
      });

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === Method.Get || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
