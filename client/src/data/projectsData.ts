export interface Project {
  id: string;
  title: string;
  category: string;
  image?: string;
  overview: string;
  features: string[];
  technologies: string[];
  challenges: string;
  standOut: string;
}

export const projectsData: Project[] = [
  {
    id: 'law-firm-platform',
    title: 'M&H Advocates & Corporate Consultants Platform',
    category: 'Full Stack',
    image: '/project_law_firm.png',
    overview: 'Developed during an internship at Al-Raheem Technologies, this production-ready law firm platform was built from scratch to manage legal services, client intake, appointment scheduling, and secure form handling. The platform focused on creating a professional, scalable, and secure digital experience for legal clients and administrators.',
    features: [
      'Case management system',
      '10+ legal service intake forms',
      'Appointment scheduling with Calendly',
      'Firebase Authentication with Google OAuth',
      'Email verification system',
      'Secure Supabase PostgreSQL integration',
      'Row Level Security (RLS)',
      'Automated email notifications using EmailJS',
      'CI/CD deployment pipeline with GitHub Actions'
    ],
    technologies: ['React.js', 'Next.js', 'Firebase Authentication', 'Supabase', 'PostgreSQL', 'EmailJS', 'GitHub Actions', 'Vercel'],
    challenges: 'This project required integrating multiple services into one cohesive production system while ensuring security, scalability, and smooth user experience.',
    standOut: 'This is a real-world production project developed during a professional internship. It demonstrates practical industry-level experience in authentication, databases, deployment, CI/CD, and scalable web application architecture.'
  },
  {
    id: 'presence-plus',
    title: 'Presence+ — Enhanced Bluetooth Attendance',
    category: 'Mobile / AI',
    image: '/project_presence.png',
    overview: 'Presence+ is a smart attendance management system designed to automate classroom attendance using Bluetooth-based proximity detection and real-time synchronization. The application provides separate interfaces for teachers and students, making attendance management fast, secure, and efficient.',
    features: [
      'Bluetooth-based automatic attendance marking',
      'Separate teacher and student dashboards',
      'Real-time attendance synchronization',
      'Session-based attendance management',
      'Attendance analytics and reporting',
      'Live classroom tracking',
      'Firebase integration for real-time updates',
      'Secure authentication and role management',
      'MVVM architecture implementation in Flutter'
    ],
    technologies: ['Flutter', 'Dart', 'Firebase', 'Bluetooth Low Energy (BLE)', 'MVVM Architecture', 'Real-time Database Synchronization'],
    challenges: 'One of the biggest challenges was implementing stable Bluetooth communication and ensuring reliable synchronization between multiple devices in real-time. The system also required efficient handling of device discovery, attendance verification, and session management without causing delays or duplicate entries.',
    standOut: 'This project combines mobile development, Bluetooth communication, real-time databases, and scalable architecture into a single production-style application. It demonstrates strong problem-solving skills in mobile engineering and real-time systems.'
  },
  {
    id: 'blogging-platform',
    title: 'Blogging Platform',
    category: 'Full Stack',
    overview: 'The Blogging Platform is a full-stack web application developed for content creation and management. The platform includes secure authentication, role-based access control, and a complete CRUD system for managing blogs and user interactions.',
    features: [
      'JWT-based authentication',
      'Admin dashboard',
      'Full CRUD blog management',
      'User authentication and authorization',
      'Secure backend APIs',
      'MySQL database integration',
      'Responsive UI design',
      'Dynamic content management'
    ],
    technologies: ['PHP', 'Laravel', 'MySQL', 'JWT Authentication', 'HTML/CSS', 'JavaScript'],
    challenges: 'The project required implementing secure authentication and authorization while maintaining a smooth user experience. Database relationships and API handling were optimized for scalability and maintainability.',
    standOut: 'This project demonstrates backend engineering skills, authentication systems, database management, and full-stack web development experience.'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Landing Page',
    category: 'Web App',
    overview: 'This project is a modern and highly interactive digital marketing landing page developed to deliver an engaging user experience with clean animations and reusable UI components. The landing page focuses on performance, responsiveness, and modern frontend design principles.',
    features: [
      'Modern responsive UI design',
      'Smooth animations and transitions',
      'Reusable component architecture',
      'Mobile-first layout',
      'Optimized performance',
      'Interactive user experience',
      'Clean and scalable frontend structure'
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React.js'],
    challenges: 'The main challenge was balancing advanced animations and visual effects while maintaining strong performance and responsiveness across devices.',
    standOut: 'This project highlights frontend development expertise, UI/UX understanding, and experience building scalable modern web interfaces using industry-standard technologies.'
  },
  {
    id: 'smart-image-enhancer',
    title: 'Smart Image Enhancer',
    category: 'Mobile / AI',
    overview: 'Smart Image Enhancer is an AI-powered mobile application designed to improve image quality using deep learning-based super-resolution techniques. The application allows users to upload low-quality or blurry images and enhance them using ESRGAN-based AI models.',
    features: [
      'AI-powered image enhancement',
      'Super-resolution image processing',
      'Real-time image processing updates using WebSockets',
      'Firebase storage integration',
      'Mobile-first responsive UI',
      'Fast image upload and download workflow',
      'Backend processing with Flask APIs'
    ],
    technologies: ['Flutter', 'Dart', 'Python', 'Flask', 'ESRGAN', 'WebSockets', 'Firebase Storage'],
    challenges: 'The major challenge in this project was handling heavy AI image processing while maintaining a smooth user experience on mobile devices. WebSockets were implemented to provide live processing updates and reduce perceived waiting time for users.',
    standOut: 'This project showcases the integration of AI models with modern mobile app development. It demonstrates practical implementation of deep learning, backend APIs, and real-time communication in a user-focused application.'
  },
  {
    id: 'car-damage-detection',
    title: 'Car Damage Detection System',
    category: 'AI / Machine Learning',
    overview: 'Car Damage Detection is a computer vision-based application developed to automatically detect vehicle damage using machine learning and object detection techniques. The project uses YOLO-based detection models to identify scratches, dents, and damaged areas from uploaded vehicle images.',
    features: [
      'Automated car damage detection',
      'YOLO-based object detection pipeline',
      'Damage localization and highlighting',
      'Web-based upload interface',
      'Image processing and analysis',
      'Machine learning model integration',
      'Fast inference and result generation'
    ],
    technologies: ['Python', 'YOLO', 'OpenCV', 'Machine Learning', 'Flask', 'HTML/CSS/JavaScript'],
    challenges: 'The main challenge was training and integrating the object detection model to accurately identify different types of vehicle damage under varying lighting and image conditions.',
    standOut: 'This project demonstrates practical application of AI and computer vision in real-world automotive inspection scenarios. It highlights experience with machine learning pipelines, image processing, and AI deployment.'
  }
];
