# Recipe Sharing Community

The Recipe Sharing Community is a full-stack web application designed to connect cooking enthusiasts. It allows users to share, discover, and organize recipes while fostering a vibrant culinary community.

## Live URL
[Recipe Sharing Community](https://your-live-url.com)

## Backend Repository
[Backend Repository Link](https://github.com/your-backend-repository)

---

## Features

### 1. **User Features**
- **Recipe Submission:** Users can create and update recipes with detailed ingredient lists and images.
- **Ingredient Checklist:** Interactive checklist for managing cooking ingredients.
- **Cooking Timer:** Built-in timer for tracking cooking durations.
- **Social Features:** Commenting, rating, and upvoting/downvoting recipes.
- **Profile Management:** Update profile details, follow/unfollow users, and view personal recipe submissions.
- **Premium Subscription:** Access exclusive content through a paid subscription.

### 2. **Admin Features**
- **Recipe Management:** Publish, unpublish, and delete recipes.
- **User Management:** Block/unblock users and manage accounts.
- **Admin Accounts:** Add and manage admin users.

### 3. **Search and Filters**
- **Advanced Search:** Search recipes by keywords, ingredients, cooking time, and tags (e.g., vegetarian, gluten-free).
- **Sorting:** Filter recipes by ratings, popularity, and preparation time.

### 4. **Recipe Feed**
- Infinite scroll for seamless browsing.
- Display recipes with images, ratings, and basic details.

### 5. **Payment Integration**
- **Subscription Payments:** AAMARPAY/Stripe integration for secure payments.
- **Membership Features:** Premium users can access exclusive recipes and advanced filters.

---

## Technologies Used

- **Frontend:** React.js, Redux Toolkit, Ant Design
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT-based secure login system
- **Payment Gateway:** AAMARPAY/Stripe

---

## Prerequisites

- **Node.js:** v20.11.1 or higher
- **npm:** Package Manager

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-repo/recipe-sharing-community.git
```

### 2. Navigate to the project directory
```bash
cd recipe-sharing-community
```

### 3. Install dependencies
```bash
npm install
```

### 4. Set up environment variables
Create a `.env` file in the root directory with the following variables:
```env
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
STRIPE_SECRET=your-stripe-secret
AAMARPAY_MERCHANT_KEY=your-aamarpay-merchant-key
```

### 5. Run the application
Start the development server:
```bash
npm run dev
```
Access the application at [http://localhost:5000](http://localhost:5000).

---

## Folder Structure

- **`/frontend`**: React application for the user interface.
- **`/backend`**: Express server for APIs and business logic.
- **`/models`**: MongoDB models for users, recipes, and comments.
- **`/routes`**: API endpoints for authentication, recipes, and user management.

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## Future Enhancements
- Social media integration for sharing recipes.
- Real-time chat for culinary discussions.
- AI-based recipe recommendations based on user preferences.

---

## License
This project is licensed under the MIT License.

---

## Contact
For any inquiries or support, please contact [your-email@example.com](mailto:your-email@example.com).
