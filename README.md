# SalonConApp

A professional salon booking website built with React and Node.js that allows customers to book appointments online and automatically sends email notifications to the salon owner.

## Features

- **Modern Design**: Elegant, responsive interface with salon-themed colors
- **Booking Form**: Clean form for customers to enter their details and service preferences
- **Email Notifications**: Automatic emails sent to salon owner when bookings are made
- **Service Options**: Haircut, Trim, and Hair Color services
- **Form Validation**: Client and server-side validation for data integrity
- **Success Feedback**: Beautiful confirmation modal after successful booking

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: Node.js, Express.js, TypeScript
- **Email**: Nodemailer with Gmail SMTP
- **Validation**: Zod schemas shared between frontend and backend
- **Build Tools**: Vite for development and building

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and API client
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data storage interface
│   └── vite.ts           # Vite integration
├── shared/               # Shared code between frontend and backend
│   └── schema.ts         # Zod validation schemas
└── package.json          # Dependencies and scripts
```

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables for email (optional for testing):
   - `EMAIL_USER`: Gmail address for sending emails
   - `EMAIL_PASS`: Gmail app password
4. Start the development server: `npm run dev`
5. Open your browser to `http://localhost:5000`

## Email Configuration

The system sends booking notifications to `ankitvaid2345@gmail.com`. To customize this:

1. Edit the email address in `server/routes.ts` (line 50)
2. Set up Gmail app password for authentication
3. Configure environment variables for production deployment

## Deployment

The application is designed for easy deployment on platforms like Replit, Vercel, or similar services. The build process creates optimized frontend and backend bundles.

## License

This project is open source and available under the MIT License.