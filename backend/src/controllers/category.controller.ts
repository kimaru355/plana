import { Request, Response } from "express";
import { EventCategory } from "../interfaces/category";
import { v4 } from "uuid";
import { getIdFromToken } from "../helpers/get_id_from_token";
import { EventCategoryService } from "../services/category.service";
import { Res } from "../interfaces/res";

export const createEventCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const category: EventCategory = req.body;
  category.adminId = getIdFromToken(req);
  if (!category.name || !category.imageUrl || !category.adminId) {
    return res.status(400).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  category.id = v4();
  const eventCategoryService = new EventCategoryService();
  const result: Res<null> = await eventCategoryService.createEventCategory(
    category
  );
  return res.status(200).json(result);
};

export const updateEventCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const category: EventCategory = req.body;
  category.id = req.params.id;
  category.adminId = getIdFromToken(req);
  if (
    !category.id ||
    !category.adminId ||
    !category.imageUrl ||
    !category.name
  ) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  const eventCategoryService = new EventCategoryService();
  const result: Res<null> = await eventCategoryService.updateEventCategory(
    category
  );
  return res.status(200).json(result);
};

export const deleteEventCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;
  if (!id) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }

  const eventCategoryService = new EventCategoryService();
  const result: Res<null> = await eventCategoryService.deleteEventCategory(id);
  return res.status(200).json(result);
};

export const getEventCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;
  if (!id) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }

  const eventCategoryService = new EventCategoryService();
  const result: Res<EventCategory | null> =
    await eventCategoryService.getEventCategory(id);
  return res.status(200).json(result);
};

export const getAllEventCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventCategoryService = new EventCategoryService();
  const result: Res<EventCategory[] | null> =
    await eventCategoryService.getAllEventCategories();
  return res.status(200).json(result);
};

export const getEventCategoriesByAdminId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const adminId = getIdFromToken(req);
  const eventCategoryService = new EventCategoryService();
  const result: Res<EventCategory[] | null> =
    await eventCategoryService.getEventCategoriesByAdminId(adminId);
  return res.status(200).json(result);
};
