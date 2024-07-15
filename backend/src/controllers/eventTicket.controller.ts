import { Request, Response } from "express";
import { Res } from "../interfaces/res";
import { v4 } from "uuid";
import { getIdFromToken } from "../helpers/get_id_from_token";
import { EventTicket } from "../interfaces/ticket";
import { EventTicketService } from "../services/eventTicket.service";

export const createEventTicket = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventTicket: EventTicket = req.body;
  eventTicket.organizerId = getIdFromToken(req);
  eventTicket.id = v4();
  if (
    !eventTicket.id ||
    !eventTicket.organizerId ||
    !eventTicket.name ||
    !eventTicket.type ||
    !eventTicket.price ||
    !eventTicket.persons ||
    !eventTicket.quantity ||
    !eventTicket.capacity ||
    !eventTicket.eventId
  ) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  const eventTicketService = new EventTicketService();
  const response: Res<null> = await eventTicketService.createEventTicket(
    eventTicket
  );
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const createEvents = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventTickets: EventTicket[] = req.body;
  const organizerId = getIdFromToken(req);
  eventTickets.forEach((eventTicket) => {
    return {
      ...eventTicket,
      id: v4(),
      organizerId: organizerId,
    };
  });
  let isDataValid: boolean = true;
  eventTickets.map((eventTicket) => {
    if (
      !eventTicket.id ||
      !eventTicket.organizerId ||
      !eventTicket.name ||
      !eventTicket.type ||
      !eventTicket.price ||
      !eventTicket.persons ||
      !eventTicket.quantity ||
      !eventTicket.capacity ||
      !eventTicket.eventId
    ) {
      isDataValid = false;
    }
  });
  if (!isDataValid) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  const eventTicketService = new EventTicketService();
  const response: Res<null> = await eventTicketService.createEventTickets(
    eventTickets
  );
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const updateEventTicket = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventTicketService = new EventTicketService();
  const eventTicket: EventTicket = req.body();
  const response: Res<null> = await eventTicketService.updateEventTicket(
    eventTicket
  );
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const deleteEvent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventTicketService = new EventTicketService();
  const id: string = req.params.id;
  if (!id) {
    return res.status(200).json({
      success: false,
      message: "Please provide an id",
      data: null,
    });
  }
  const response: Res<null> = await eventTicketService.deleteEvent(id);
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const getEvent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventTicketService = new EventTicketService();
  const id: string = req.params.id;
  const organizerId = getIdFromToken(req);
  const response: Res<Event | null> = await eventTicketService.getEvent(
    id,
    organizerId
  );
  if (response.success && response.data) {
    const updatedResponse: Res<EventImagesArray> = {
      ...response,
      data: {
        ...response.data,
        images: response.data.images.split(":::::"),
      },
    };
    return res.status(200).json(updatedResponse);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const getAllEvents = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventTicketService = new EventTicketService();
  const organizerId = getIdFromToken(req);
  const response: Res<Event[] | null> = await eventTicketService.getAllEvents(
    organizerId
  );
  if (response.success && response.data) {
    const updatedResponse: Res<EventImagesArray[]> = {
      success: response.success,
      message: response.message,
      data: response.data.map((event) => {
        return {
          ...event,
          images: event.images.split(":::::"),
        };
      }),
    };
    return res.status(200).json(updatedResponse);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const getEventsByCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventTicketService = new EventTicketService();
  const eventCategory: string = req.params.eventCategory;
  const organizerId = getIdFromToken(req);
  const response: Res<Event[] | null> =
    await eventTicketService.getEventsByCategory(eventCategory, organizerId);
  if (response.success && response.data) {
    const updatedResponse: Res<EventImagesArray[]> = {
      success: response.success,
      message: response.message,
      data: response.data.map((event) => {
        return {
          ...event,
          images: event.images.split(":::::"),
        };
      }),
    };
    return res.status(200).json(updatedResponse);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const getEventsByName = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventTicketService = new EventTicketService();
  const eventName: string = req.params.eventName;
  const organizerId = getIdFromToken(req);
  const response: Res<Event[] | null> =
    await eventTicketService.getEventsByName(eventName, organizerId);
  if (response.success && response.data) {
    const updatedResponse: Res<EventImagesArray[]> = {
      success: response.success,
      message: response.message,
      data: response.data.map((event) => {
        return {
          ...event,
          images: event.images.split(":::::"),
        };
      }),
    };
    return res.status(200).json(updatedResponse);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const getEventsByCountry = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventTicketService = new EventTicketService();
  const eventCountry: string = req.params.eventCountry;
  if (!eventCountry) {
    return res.status(200).json({
      success: false,
      message: "Please provide a country to filter events by",
      data: null,
    });
  }
  const organizerId = getIdFromToken(req);
  const response: Res<Event[] | null> =
    await eventTicketService.getEventsByCountry(eventCountry, organizerId);
  if (response.success && response.data) {
    const updatedResponse: Res<EventImagesArray[]> = {
      success: response.success,
      message: response.message,
      data: response.data.map((event) => {
        return {
          ...event,
          images: event.images.split(":::::"),
        };
      }),
    };
    return res.status(200).json(updatedResponse);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const getEventsByTicketPrice = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventTicketService = new EventTicketService();
  const { min, max } = req.body as { min: number; max: number };
  if (!min || !max) {
    return res.status(200).json({
      success: false,
      message: "Please provide a price range",
      data: null,
    });
  }
  const organizerId = getIdFromToken(req);
  const response: Res<Event[] | null> =
    await eventTicketService.getEventsByTicketPrice(min, max, organizerId);
  if (response.success && response.data) {
    const updatedResponse: Res<EventImagesArray[]> = {
      success: response.success,
      message: response.message,
      data: response.data.map((event) => {
        return {
          ...event,
          images: event.images.split(":::::"),
        };
      }),
    };
    return res.status(200).json(updatedResponse);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const getEventsByTimeRange = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventTicketService = new EventTicketService();
  const { min, max } = req.body as { min: Date; max: Date };
  if (!min || !max) {
    return res.status(200).json({
      success: false,
      message: "Please provide a time range",
      data: null,
    });
  }
  const organizerId = getIdFromToken(req);
  const response: Res<Event[] | null> =
    await eventTicketService.getEventsByTimeRange(min, max, organizerId);
  if (response.success && response.data) {
    const updatedResponse: Res<EventImagesArray[]> = {
      success: response.success,
      message: response.message,
      data: response.data.map((event) => {
        return {
          ...event,
          images: event.images.split(":::::"),
        };
      }),
    };
    return res.status(200).json(updatedResponse);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};
