import { Request, Response } from "express";
import { Res } from "../interfaces/res";
import { EventService } from "../services/event.service";
import { Event, EventCreate, EventImagesArray } from "../interfaces/event";
import { v4 } from "uuid";
import { getIdFromToken } from "../helpers/get_id_from_token";

export const createEvent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventInput: EventCreate = req.body;
  const event: Event = {
    ...eventInput,
    startTime: new Date(eventInput.startTime),
    endTime: new Date(eventInput.endTime),
    images: eventInput.images.join(":::::"),
  };
  event.organizerId = getIdFromToken(req);
  event.id = v4();
  if (
    !event.id ||
    !event.title ||
    !event.description ||
    !event.startTime ||
    !event.endTime ||
    !event.country ||
    !event.city ||
    !event.location ||
    !event.capacity ||
    !event.images ||
    !event.organizerId ||
    !event.categoryId ||
    event.startTime < new Date() ||
    event.startTime > event.endTime
  ) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  const eventService = new EventService();
  const response: Res<null> = await eventService.createEvent(event);
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
  const eventsInput: EventCreate[] = req.body;
  const organizerId = getIdFromToken(req);
  const events: Event[] = eventsInput.map((eventInput) => {
    return {
      ...eventInput,
      id: v4(),
      organizerId: organizerId,
      startTime: new Date(eventInput.startTime),
      endTime: new Date(eventInput.endTime),
      images: eventInput.images.join(":::::"),
    };
  });
  let isDataValid: boolean = true;
  events.map((event) => {
    if (
      !event.id ||
      !event.title ||
      !event.description ||
      !event.startTime ||
      !event.endTime ||
      !event.country ||
      !event.city ||
      !event.location ||
      !event.capacity ||
      !event.images ||
      !event.organizerId ||
      !event.categoryId ||
      event.startTime < new Date()
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
  const eventService = new EventService();
  const response: Res<null> = await eventService.createEvents(events);
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const updateEvent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventService = new EventService();
  const EventImagesArray: EventImagesArray = req.body;
  const event: Event = {
    ...EventImagesArray,
    images: EventImagesArray.images.join(":::::"),
  };
  const response: Res<null> = await eventService.updateEvent(event);
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
  const eventService = new EventService();
  const id: string = req.params.id;
  if (!id) {
    return res.status(200).json({
      success: false,
      message: "Please provide an id",
      data: null,
    });
  }
  const response: Res<null> = await eventService.deleteEvent(id);
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
  const eventService = new EventService();
  const id: string = req.params.id;
  const organizerId = getIdFromToken(req);
  const response: Res<Event | null> = await eventService.getEvent(
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
  const eventService = new EventService();
  const organizerId = getIdFromToken(req);
  const response: Res<Event[] | null> = await eventService.getAllEvents(
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
  const eventService = new EventService();
  const eventCategory: string = req.params.eventCategory;
  const organizerId = getIdFromToken(req);
  const response: Res<Event[] | null> = await eventService.getEventsByCategory(
    eventCategory,
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

export const getEventsByName = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventService = new EventService();
  const eventName: string = req.params.eventName;
  const organizerId = getIdFromToken(req);
  const response: Res<Event[] | null> = await eventService.getEventsByName(
    eventName,
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

export const getEventsByCountry = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventService = new EventService();
  const eventCountry: string = req.params.eventCountry;
  if (!eventCountry) {
    return res.status(200).json({
      success: false,
      message: "Please provide a country to filter events by",
      data: null,
    });
  }
  const organizerId = getIdFromToken(req);
  const response: Res<Event[] | null> = await eventService.getEventsByCountry(
    eventCountry,
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

export const getEventsByTicketPrice = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventService = new EventService();
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
    await eventService.getEventsByTicketPrice(min, max, organizerId);
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
  const eventService = new EventService();
  const { min, max } = req.body as { min: Date; max: Date };
  if (!min || !max) {
    return res.status(200).json({
      success: false,
      message: "Please provide a time range",
      data: null,
    });
  }
  const organizerId = getIdFromToken(req);
  const response: Res<Event[] | null> = await eventService.getEventsByTimeRange(
    min,
    max,
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
