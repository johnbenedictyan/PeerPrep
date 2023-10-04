class GenericController {
  private mainUri: string;

  private servicePath: string;

  constructor(mainUri: string, servicePath: string) {
    this.mainUri = mainUri;
    this.servicePath = servicePath;
  }

  private getUri(routePath: string): string {
    return `${this.mainUri}/${this.servicePath}/${routePath}`;
  }

  public async get(routePath: string) {
    const response = await fetch(this.getUri(routePath), {
      method: "GET",
    });

    return response.json();
  }

  public async post(routePath: string, data: any, headers?: any) {
    const response = await fetch(this.getUri(routePath), {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      method: "POST",
    });

    return response.json();
  }
}

export default GenericController;
