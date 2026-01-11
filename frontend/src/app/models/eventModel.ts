import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  activity: { type: String, required: true },
  description: { type: String, required: true },
});

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the event name"],
    },
    image: {
        type: String,
        required: [true, "Please enter the event image URL"],
    },
    description: {
        type: String,
        required: [true, "Please enter the event description"],
    },
    organizer_name: {
        type: String,
        required: [true, "Please enter the organizer name"],
    },
    event_type: {
        type: String,
        required: [true, "Please enter the event type"],
    },
    event_category: {
        type: String,
        required: [true, "Please enter the event category"],
    },
    location: {
        type: String,
        required: [true, "Please enter the event location"],
    },
    schedule: {
        type: [scheduleSchema],
    },
    ticketId: {
        type: Number,
        default: null,
    },
},
    {
        timestamps: true,
    });

export default mongoose.models.Event || mongoose.model("Event", eventSchema);