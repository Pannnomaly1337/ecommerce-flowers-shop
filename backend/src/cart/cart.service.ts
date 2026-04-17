import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddToCartDto } from '../cart/dto/add-to-cart-dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}
  async addTocart(userId: string, dto: AddToCartDto) {
    const { productId, quantity } = dto;

    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    let cart = await this.prisma.cart.findFirst({
      where: { userId },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
      });
    }

    const existingItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (existingItem) {
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
        },
      });
    }

    if (quantity > product.stock) {
      throw new Error('Not enough stock');
    }

    return this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
  }

  async getMyCart(userId: string) {
    return this.prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async updateItem(userId: string, itemId: string, quantity: number) {
    const item = await this.prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cart: {
          userId,
        },
      },
    });

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    return this.prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });
  }

  async removeItem(userId: string, itemId: string) {
    const item = await this.prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cart: {
          userId,
        },
      },
    });

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    return this.prisma.cartItem.delete({
      where: { id: itemId },
    });
  }
}
