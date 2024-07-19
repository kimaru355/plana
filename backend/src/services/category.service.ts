import { EventCategory, PrismaClient } from "@prisma/client";
import { EventCategoryServices } from "../interfaces/category_service";
import { Res } from "../interfaces/res";

export class EventCategoryService implements EventCategoryServices {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async createEventCategory(category: EventCategory): Promise<Res<null>> {
    try {
      await this.prisma.eventCategory.create({
        data: category,
      });
      return {
        success: true,
        message: "Category successfully created",
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async updateEventCategory(category: EventCategory): Promise<Res<null>> {
    try {
      await this.prisma.eventCategory.update({
        where: {
          id: category.id,
        },
        data: category,
      });
      return {
        success: true,
        message: "Category successfully updated",
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async deleteEventCategory(categoryId: string): Promise<Res<null>> {
    try {
      await this.prisma.eventCategory.delete({
        where: {
          id: categoryId,
        },
      });
      return {
        success: true,
        message: "Category successfully deleted",
        data: null,
      };
    } catch (error: any) {
      if (
        error.message &&
        typeof error.message === "string" &&
        error.message.includes(
          "An operation failed because it depends on one or more records that were required but not found."
        )
      ) {
        return {
          success: false,
          message: "Category has some events, cannot delete",
          data: null,
        };
      }

      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getEventCategory(id: string): Promise<Res<EventCategory | null>> {
    try {
      const category = await this.prisma.eventCategory.findUnique({
        where: {
          id,
        },
      });
      if (!category) {
        return {
          success: false,
          message: "Category not found",
          data: null,
        };
      }
      return {
        success: true,
        message: "Category found",
        data: category,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getAllEventCategories(): Promise<Res<EventCategory[] | null>> {
    try {
      const categories = await this.prisma.eventCategory.findMany();
      return {
        success: true,
        message: "Categories found",
        data: categories,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getEventCategoriesByAdminId(
    adminId: string
  ): Promise<Res<EventCategory[] | null>> {
    try {
      const categories = await this.prisma.eventCategory.findMany({
        where: {
          adminId,
        },
      });
      return {
        success: true,
        message: "Categories found",
        data: categories,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }
}
