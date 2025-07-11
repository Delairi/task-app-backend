import mongoose, { HydratedDocument } from 'mongoose';

export interface Event {
    service: string;
    action: 'create' | 'update' | 'delete';
    date: Date;
    changes: {
        [key: string]: any;
    }
}

export type EventDocument = HydratedDocument<Event>;

export const EventSchema = new mongoose.Schema<Event>({
    service: {
        type: String,
        required: true,
    },
    action: {
        type: String,
        enum: ['create', 'update', 'delete'],
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    changes: {
        type: Object,
        required: true,
    }
})