class FetchHelper {
  baseUrl = 'http://localhost:3333';

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
}

const fetchHelper = new FetchHelper();

export default fetchHelper;
