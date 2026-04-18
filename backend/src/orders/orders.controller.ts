import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { OrdersService } from 'src/orders/orders.service';
import { Request as ExpressRequest } from 'express';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  create(@Request() req: ExpressRequest & { user: JwtPayload }) {
    return this.ordersService.createOrder(req.user.sub);
  }

  @Get()
  getMyOrders(@Request() req: ExpressRequest & { user: JwtPayload }) {
    return this.ordersService.getMyOrders(req.user.sub);
  }

  @Get(':id')
  getById(
    @Request() req: ExpressRequest & { user: JwtPayload },
    @Param('id') id: string,
  ) {
    return this.ordersService.getOrderById(req.user.sub, id);
  }
}
