/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable prettier/prettier */
import { Controller, Get, HttpStatus, Param, Req, Res } from '@nestjs/common';
import { TrialService } from './trial.service';
import { type Request, type Response } from 'express';

@Controller('trial')
export class TrialController {
  constructor(private readonly trialService: TrialService) { }

  @Get('one/:test')
  one(@Req() req: Request, @Res() res: Response, @Param('test') test: string) {
    const { test: t } = req.params!;
    return res.status(HttpStatus.ACCEPTED).json({
      message: { t, test },
    });
  }
}
