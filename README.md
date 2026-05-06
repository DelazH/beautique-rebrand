# KC Beautique - Beauty Services & Products Website

A modern, responsive website for KC Beautique, showcasing beauty services and products with online booking capabilities.

## 🌟 Features

- **Service Listings**: Browse salon services with descriptions, pricing, and duration
- **Product Catalog**: Explore beauty products with images and availability
- **Online Booking**: Easy appointment scheduling system
- **Responsive Design**: Beautiful UI that works on all devices
- **About & Team**: Learn about Kaylah and the salon team
- **Contact Form**: Get in touch with the salon
- **Modern Tech Stack**: React, TypeScript, Tailwind CSS, Supabase

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or bun package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/DelazH/beautique-rebrand.git
cd beautique-rebrand
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env.local` file with your Supabase credentials
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📦 Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── lib/
│   ├── hooks/        # Custom React hooks
│   └── supabaseClient.ts  # Supabase configuration
├── types/            # TypeScript type definitions
├── styles/           # Global styles
└── App.tsx           # Main app component
```

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **State Management**: TanStack Query (React Query)
- **Backend**: Supabase
- **Routing**: React Router
- **Forms**: React Hook Form with Zod validation
- **Testing**: Vitest

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## 🗄️ Supabase Setup

### Required Tables

1. **services** table
```sql
CREATE TABLE services (
  id UUID PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  duration INT,
  category VARCHAR,
  created_at TIMESTAMP
);
```

2. **products** table
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  image_url VARCHAR,
  stock INT,
  created_at TIMESTAMP
);
```

3. **bookings** table
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY,
  service_id UUID REFERENCES services(id),
  user_id VARCHAR,
  date DATE,
  time TIME,
  status VARCHAR DEFAULT 'pending',
  created_at TIMESTAMP
);
```

## 🎨 Customization

- **Colors**: Edit Tailwind config in `tailwind.config.ts`
- **Navigation**: Update links in `src/components/Navbar.tsx`
- **Contact Info**: Update in `src/components/Footer.tsx` and `src/pages/Contact.tsx`

## 📄 License

This project is proprietary to KC Beautique.

## 👨‍💼 Support

For issues or questions, please contact info@kcbeautique.com
