import orderModel from "../models/order.model.js";
import Location from "../models/location.model.js";
import { createOrderValidator } from "../utils/validators.js";

const createOrder = async (req, res, next) => {
  try {
    const { error } = createOrderValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const order = await orderModel.create(req.body);

    res.status(201).json({ data: order }); // 201 Created
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const { role, organizationID, assignedLocation } = req.user;
    const storeIdParam = req.params.id;

    let query = {};

    if (role === "StoreManager") {
      if (!assignedLocation) {
        return res.status(400).json({ message: "StoreManager has no assigned store/location." });
      }

      if (storeIdParam && storeIdParam !== assignedLocation.toString()) {
        return res.status(403).json({ message: "Access denied. StoreManager can only access their assigned store." });
      }

      query = { storeId: assignedLocation };
    } else if (role === "Owner") {
      if (storeIdParam) {
        const targetLocation = await Location.findById(storeIdParam);
        if (!targetLocation || targetLocation.organizationId.toString() !== organizationID.toString()) {
          return res.status(403).json({ message: "Access denied. Store does not belong to your organization." });
        }
        query = { storeId: storeIdParam };
      } else {
        const locations = await Location.find({ organizationId: organizationID });
        const locationIds = locations.map((loc) => loc._id);
        query = { storeId: { $in: locationIds } };
      }
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }

    const orders = await orderModel
      .find(query)
      .populate("customerId")
      .populate("storeId")
      .populate("items.itemId");

    res.status(200).json({ data: orders });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await orderModel
      .findById(req.params.id)
      .populate("customerId")
      .populate("storeId")
      .populate("items.itemId");

    return order
      ? res.status(200).json({ data: order })
      : res.status(404).json({ message: "order not found" }); // 404 Not Found
  } catch (error) {
    next(error);
  }
};

export { createOrder, getAllOrders, getOrderById };
