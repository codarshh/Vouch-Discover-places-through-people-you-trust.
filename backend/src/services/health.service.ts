export interface HealthResponse {
  status: 'ok';
}

export class HealthService {
  /**
   * Health check business logic.
   */
  async getHealthStatus(): Promise<HealthResponse> {
    return { status: 'ok' };
  }
}
