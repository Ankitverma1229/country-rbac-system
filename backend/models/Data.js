import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
    country: { type: String, required: true }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    population: { type: Number, required: true },
    gdp: { type: Number, required: true },
    popularCities: [{ type: String, required: true }],
    mainLanguages: [{ type: String, required: true }],
    eventCalendar: [{
        eventName: { type: String, required: true },
        date: { type: Date },
    }],
    weather: {
        temperature: { type: Number, required: true },
        humidity: { type: Number, required: true },
    },
}, { timestamps: true });

export default mongoose.model('Data', dataSchema);
