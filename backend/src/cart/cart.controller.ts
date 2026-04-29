import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CartService } from 'src/cart/cart.service';
import { AddToCartDto } from './dto/add-to-cart-dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.CUSTOMER)
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getMyCart(@Request() req: ExpressRequest & { user: JwtPayload }) {
    return this.cartService.getMyCart(req.user.sub);
  }

  @Post()
  addToCart(
    @Request() req: ExpressRequest & { user: JwtPayload },
    @Body() body: AddToCartDto,
  ) {
    return this.cartService.addToCart(req.user.sub, body);
  }

  @Patch(':itemId')
  update(
    @Request() req: ExpressRequest & { user: JwtPayload },
    @Param('itemId') itemId: string,
    @Body() body: { quantity: number },
  ) {
    return this.cartService.updateItem(req.user.sub, itemId, body.quantity);
  }

  @Delete(':itemId')
  remove(
    @Request() req: ExpressRequest & { user: JwtPayload },
    @Param('itemId') itemId: string,
  ) {
    return this.cartService.removeItem(req.user.sub, itemId);
  }
}
