import { Heart, Shield, Users } from "lucide-react";
import Card from "../components/ui/Card";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      icon: "Shield",
      title: "Privacy First",
      text: "Your data is encrypted and secure. We prioritize your privacy above all else.",
    },
    {
      icon: "Heart",
      title: "Empathetic Support",
      text: "AI-powered conversations designed with empathy and understanding.",
    },
    {
      icon: "Users",
      title: "Professional Care",
      text: "Connect with licensed therapists through our secure platform.",
    },
  ];

  const handleGetStarted = () => {
    navigate("/onboarding");
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col justify-evenly h-full min-h-screen mborder border-amber-500">
        {/* Hero Section */}
        <div className="mx-auto flex flex-col gap-10 mt-15">
        <h1 className="mx-auto text-center text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Calma
        </h1>
        <p className="text-md p-2 md:text-2xl text-muted-foreground  max-w-3xl mx-auto text-center">
          Your trusted companion for mental health support.<br/> Safe,
          secure, and compassionate care when you need it most.
        </p>
        </div>

        {/* Cards Section */}
        <div className="flex mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6 justify-center mt-10">
          {cardData.map((card, idx) => {
          const icons = { Shield, Heart, Users };
          const Icon = icons[card.icon as keyof typeof icons];
          return (
            <Card
            key={idx}
            icon={
              <Icon className="h-8 w-8 text-primary" />
            }
            title={card.title}
            text={card.text}
            />
          );
          })}
        </div>
        </div>

        {/* Get Started */}
        <div className="mx-auto p-8 md:p-20 md:pt-0 flex flex-col justify-center items-center gap-5 md:gap-5">
        <button onClick={handleGetStarted} className="text-white bg-primary p-2 rounded-xl w-40 h-10 font-bold shadow-xl hover:shadow-black/20 transition-all duration-300 ease-in-out">
          Get Started Today
        </button>
        <div className="flex mx-auto gap-2">
          <p className="  text-md text-muted-foreground">Free to start • </p>
          <p className="text-md text-muted-foreground">HIPAA compliant • </p>
          <p className="text-md text-muted-foreground">Available 24/7</p>
        </div>
        </div>

        {/* Features */}
        
      </div>
    </div>
  );
};

export default LandingPage;
