import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database Connected:", connection.connection.host, connection.connection.name);
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        console.log('Database connection failed...');
        process.exit(1);
    }
}


