import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";

type Props = {
  header: string;
  body: string;
  icon: React.ReactElement;
};

const FeaturesCard = (props: Props) => {
  return (
    <Card
      className="w-[100%] my-4 md:w-72 bg-transparent border border-subsidiary py-5 hover:bg-subsidiary group max-w-80 h-96 relative"
    >
       <div className="absolute top-0 left-0 p-4">
        {props.icon}
      </div>
      <CardHeader className="text-2xl bg-gradient-to-r from-[#007CFA] from-30% to-white to-80% bg-clip-text font-semibold text-transparent group-hover:text-white text-center">
        {props.header}
      </CardHeader>
      <CardContent className="text-text group-hover:text-white text-center text-lg px-4">
        {props.body}
      </CardContent>
    </Card>
  );
};

export default FeaturesCard;