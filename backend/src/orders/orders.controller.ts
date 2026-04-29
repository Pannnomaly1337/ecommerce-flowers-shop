import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { OrdersService } from 'src/orders/orders.service';
import { Request as ExpressRequest } from 'express';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';
import { OrderStatus, Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Roles(Role.CUSTOMER)
  @Get()
  getMyOrders(@Request() req: ExpressRequest & { user: JwtPayload }) {
    return this.ordersService.getMyOrders(req.user.sub);
  }

  @Roles(Role.CUSTOMER)
  @Get(':id')
  getById(
    @Request() req: ExpressRequest & { user: JwtPayload },
    @Param('id') id: string,
  ) {
    return this.ordersService.getOrderById(req.user.sub, id);
  }

  @Roles(Role.CUSTOMER)
  @Post()
  create(@Request() req: ExpressRequest & { user: JwtPayload }) {
    return this.ordersService.createOrder(req.user.sub);
  }

  @Roles(Role.ADMIN)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: OrderStatus }) {
    return this.ordersService.updateStatus(id, body.status);
  }

  @Roles(Role.CUSTOMER, Role.ADMIN)
  @Patch(':id/cancel')
  cancel(
    @Request() req: ExpressRequest & { user: JwtPayload },
    @Param('id') id: string,
  ) {
    return this.ordersService.cancelOrder(req.user.sub, id);
  }
}
