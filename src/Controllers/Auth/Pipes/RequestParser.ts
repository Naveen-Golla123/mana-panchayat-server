import { PipeTransform, Injectable, ArgumentMetadata, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { FastifyReply, FastifyRequest } from 'fastify';
import { NestMiddlewareConsumer } from 'nestjs-i18n/dist/types';

@Injectable()
export class RequestParser implements NestMiddleware {
  use(req: FastifyRequest, res: FastifyReply, next: NextFunction) {
    // Fetching cookie and assigning as jwt token.
    req.headers["Authorization"] = "Bearer " + req.cookies["panchayatToken"]
    console.log(req.headers)
    if (next) {
      next();
    }
  }
}