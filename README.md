# HAJIMOTO AI

A modern web application that generates beautiful haikus using AI, complete with customization options, visualization, and the ability to save and share your favorite poems.

## 🌟 Features

- **AI-Powered Haiku Generation**: Create beautiful haikus with different themes and styles
- **Customization Options**: Control the mood, theme, and style of your generated haikus
- **Visual Representation**: See your haikus beautifully displayed with matching visuals
- **User Collections**: Save, organize, and revisit your favorite generated haikus
- **Share Functionality**: Export and share your haikus across social media platforms
- **Responsive Design**: Enjoy a seamless experience across desktop and mobile devices

## 🚀 Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: Shadcn UI, Tailwind CSS
- **State Management**: React Context API and Hooks
- **Routing**: React Router v6
- **Form Handling**: React Hook Form with Zod validation
- **Visualization**: Recharts for data visualization
- **Animation**: Tailwind CSS Animate for smooth transitions
- **API Integration**: Fetch API with React Query
- **Testing**: Jest and React Testing Library

## 📋 Installation and Setup

1. **Clone the repository**

```bash
git clone https://github.com/DalonyBell/Hajimoto.git
cd ai-haiku-haven
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. **Build for production**

```bash
npm run build
```

## 🏗️ Project Structure

```
ai-haiku-haven/
├── public/                # Static files
├── src/                   # Source code
│   ├── components/        # Reusable components
│   │   ├── ui/            # UI components from Shadcn
│   │   └── ...            # Custom components
│   ├── lib/               # Utility functions and helpers
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── store/             # Global state management
│   ├── types/             # TypeScript type definitions
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── .eslintrc.js           # ESLint configuration
├── package.json           # Project dependencies
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 💭 How It Works

The application uses a combination of AI models to generate haikus based on user preferences:

1. **Input Processing**: User selects themes, styles, and optional keywords
2. **AI Generation**: The app sends these parameters to an AI model that creates multiple haikus
3. **Display & Refinement**: Users can view, edit, regenerate, or save the haikus they like
4. **Visualization**: Each haiku is paired with a visual representation matching its theme

## 🔮 Future Enhancements

- **User Accounts**: Personal collections and preferences
- **AI Feedback Loop**: Improve the model based on user selections
- **Extended Poetry Formats**: Support for other poetry forms like sonnets, limericks
- **Audio Readings**: AI-generated voice readings of your haikus
- **Community Features**: Share and discover haikus from other users

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 About the Developer

I'm a Master's student in Computer Science passionate about combining AI with creative applications. This project showcases my skills in modern web development, AI integration, and creating intuitive user experiences.

Thank you for your time and for viewing my work!
