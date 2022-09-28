class FetchHelper {
  baseUrl = 'http://192.168.2.55:3333';

  private getUrl(path: string) {
    if (!path.startsWith('/')) {
      // eslint-disable-next-line no-param-reassign
      path = `/${path}`;
    }

    return this.baseUrl + path;
  }

  private isValidStatus(status: number): boolean {
    return status < 299;
  }

  async post<T, R>(path: string, body?: T): Promise<R> {
    const response = await fetch(this.getUrl(path), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const jsonResponse = await response.json();

    if (!this.isValidStatus(response.status)) {
      throw new Error(jsonResponse.error || jsonResponse);
    }

    return jsonResponse;
  }

  async put<T, R>(path: string, body?: T): Promise<R> {
    const response = await fetch(this.getUrl(path), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const jsonResponse = await response.json();

    if (!this.isValidStatus(response.status)) {
      throw new Error(jsonResponse.error || jsonResponse);
    }

    return jsonResponse;
  }

  async get<T>(path: string): Promise<T> {
    const response = await fetch(this.getUrl(path), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const jsonResponse = await response.json();

    if (!this.isValidStatus(response.status)) {
      throw new Error(jsonResponse.error || jsonResponse);
    }

    return jsonResponse;
  }

  async delete<T>(path: string): Promise<T> {
    const response = await fetch(this.getUrl(path), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const jsonResponse = await response.json();

    if (!this.isValidStatus(response.status)) {
      throw new Error(jsonResponse.error || jsonResponse);
    }

    return jsonResponse;
  }
}

const fetchHelper = new FetchHelper();

export default fetchHelper;
