import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema, type InsertBooking } from "@shared/schema";
import { z } from "zod";
import nodemailer from "nodemailer";

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'luxesalon.booking@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password'
    }
  });

  // Create booking endpoint
  app.post("/api/bookings", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertBookingSchema.parse(req.body);
      
      // Save booking to storage
      const booking = await storage.createBooking(validatedData);

      // Send email notification
      const serviceNames = {
        'haircut': 'Precision Haircut',
        'trim': 'Professional Trim',
        'hair-color': 'Hair Coloring'
      };

      const emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B7355;">New Salon Booking Request</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${booking.name}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Phone:</strong> ${booking.phone}</p>
            <p><strong>Service:</strong> ${serviceNames[booking.service as keyof typeof serviceNames]}</p>
            <p><strong>Booking ID:</strong> #${booking.id}</p>
          </div>
          <p style="color: #666;">Please contact the customer within 24 hours to confirm the appointment.</p>
        </div>
      `;

      const mailOptions = {
        from: process.env.EMAIL_USER || 'luxesalon.booking@gmail.com',
        to: 'ankitvaid2345@gmail.com',
        subject: `New Salon Booking Request - ${booking.name}`,
        html: emailContent
      };

      await transporter.sendMail(mailOptions);

      res.json({ 
        message: "Booking request sent successfully",
        booking: booking
      });
    } catch (error) {
      console.error("Booking error:", error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Validation error",
          errors: error.errors
        });
      } else {
        res.status(500).json({ 
          message: "Failed to process booking request"
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
