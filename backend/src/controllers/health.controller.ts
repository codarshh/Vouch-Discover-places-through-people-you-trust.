import { Request, Response, NextFunction } from 'express';
import { HealthService } from '../services/health.service.js';
import { HttpStatus } from '../utils/statusCodes.js';

export class HealthController {
  private healthService: HealthService;

  constructor(healthService: HealthService = new HealthService()) {
    this.healthService = healthService;
  }

  getHealth = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const healthData = await this.healthService.getHealthStatus();
      res.status(HttpStatus.OK).json(healthData);
    } catch (error) {
      next(error);
    }
  };
}
