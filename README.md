# AESTHETICA: Architectural Studio Platform

AESTHETICA is a specialized e-commerce and portfolio management platform designed specifically for high-end architectural studios. It allows studios to showcase their product collections, manage major architectural projects (portfolio), collect client testimonials, and process official quotations seamlessly.

---

## 🏛️ Features

### **Public Features**
*   **Product Showcase**: Browse curated residential, premium, and corporate architectural products.
*   **Curated Portfolio**: View major completed projects with high-quality imagery, location details, and case studies.
*   **Client Testimonials**: Read verified feedback from previous architectural clients.
*   **Premium Gallery**: Experience projects with an **Amazon-style side zoom** for detailed material inspection.
*   **Quotation Requests**: Users can request project-specific quotes for any architectural product.

### **Administrator Features (Admin Role required)**
*   **Product Management**: Full CRUD (Create, Read, Update, Delete) for all architectural items.
*   **Portfolio Manager**: Manage the studio's "Major Works" and completed project gallery.
*   **Testimonial Manager**: Add and manage client feedback and ratings.
*   **Quotation Engine**: Professional dashboard to view inquiries and generate official PDF quotations for clients.
*   **PDF Generation**: Instantly generate professional, studio-branded PDF documents for quotes.

---

## 🛠️ Technology Stack

*   **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
*   **Database**: [MongoDB](https://www.mongodb.com/) with Mongoose ODM
*   **Authentication**: [NextAuth.js](https://next-auth.js.org/) with Google OAuth
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **PDF Utility**: [jsPDF](https://github.com/parallax/jsPDF) and `jspdf-autotable`
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Feedback**: [React Hot Toast](https://react-hot-toast.com/)

---

## 🚀 Getting Started

### **1. Prerequisites**
*   [Node.js](https://nodejs.org/) (v18.x or later)
*   [MongoDB](https://www.mongodb.com/try/download/community) (Local instance or Atlas)

### **2. Installation**
1. Clone the repository and navigate to the project folder.
2. Install dependencies:
   ```bash
   npm install
   ```

### **3. Environment Configuration**
Create a `.env.local` file in the root directory and add the following:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXT_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_string

# Google OAuth
GOOGLE_CLIENT_ID=your_google_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_secret

# Configuration
NEXT_PUBLIC_PAGE_SIZE=10
ADMIN_SETUP_KEY=your_secret_key_for_admin_promotion
```

### **4. Run the Application**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see your application.

---

## 🔑 Admin Access Setup

To promote a user to **Admin** status:
1. Log in via Google to create a standard user profile.
2. Use a tool like Postman to send a **POST** request to `/api/admin/setup-user` (if your project includes this route) or manually update the user document in MongoDB:
   ```json
   { "role": "admin" }
   ```

---

## 📂 Project Structure

*   **/src/app**: Next.js App Router pages and API routes.
*   **/src/components**: Reusable UI components (Sidebar, Gallery, Cards, Forms).
*   **/src/models**: Mongoose schemas for Products, Portfolio, Testimonials, and Quotations.
*   **/src/lib**: Utility functions (Database connection, PDF generation, Auth options).
*   **/public**: Static assets and uploaded images.

---

## 📝 Usage

*   **Adding Products**: Go to `Sidebar > Manage Products` to add new architectural items.
*   **Adding Portfolio**: Go to `Sidebar > Manage Portfolio` to add completed works and client quotes.
*   **Generating Quotes**: When a user submits a request, found in `Sidebar > Quotation`, admins can fill in rates and click "Download PDF".

---

Developed with ❤️ for **AESTHETICA Architectural Studio**.
