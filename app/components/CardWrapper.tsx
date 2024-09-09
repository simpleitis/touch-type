import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

interface CardWrapperType {
  title: string;
  subTitle: string;
  description: string;
}

export default function CardWrapper({
  title,
  subTitle,
  description,
}: CardWrapperType) {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="flex h-10 w-10 items-center justify-center rounded-full border bg-white text-black">
          {title}
        </CardTitle>
        <CardDescription>{subTitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
