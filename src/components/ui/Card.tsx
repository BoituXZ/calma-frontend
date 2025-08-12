import type { FC } from "react";

interface CardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

const Card: FC<CardProps> = ({ icon, title, text }) => {
  return (
    <div className="bg-white border mx-auto w-[100%] h-[200px] md:w-[420px] md:h-[250px] border-primary/20 rounded-xl flex flex-col justify-center items-center shadow-xs gap-4">
      <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground font-[] text-center px-10 ">
        {text}
      </p>
    </div>
  );
};

export default Card;
