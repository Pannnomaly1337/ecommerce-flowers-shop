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

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}
  @Post()
  addToCart(
    @Request() req: ExpressRequest & { user: JwtPayload },
    @Body() body: AddToCartDto,
  ) {
    return this.cartService.addTocart(req.user.sub, body);
  }

  @Get()
  getMyCart(@Request() req: ExpressRequest & { user: JwtPayload }) {
    return this.cartService.getMyCart(req.user.sub);
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
