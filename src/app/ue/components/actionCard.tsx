"use client";
import { CheckIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImportIcon, RefreshCwIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ActionCard({
  action,
}: {
  action: {
    title: string;
    description: string;
    buttonText: string;
    targetPath: string;
    bgColor: string;
    icon?: "REFRESH" | "IMPORT";
  };
}) {
  const router = useRouter();

  return (
    <Card className={"mb-4 mr-4 mt-10 " + action.bgColor}>
      <CardHeader>
        <CardTitle>
          {action.icon === "IMPORT" ? (
            <ImportIcon className="inline-block mr-2 h-7 w-7" />
          ) : action.icon === "REFRESH" ? (
            <RefreshCwIcon className="inline-block mr-2 h-7 w-7" />
          ) : (
            <QuestionMarkCircledIcon className="inline-block mr-2 h-7 w-7" />
          )}
          {action.title}
        </CardTitle>
        <CardDescription>{action.description}</CardDescription>
      </CardHeader>

      <CardFooter>
        <Button
          className="w-full"
          onClick={() => router.push(action.targetPath)}
        >
          <CheckIcon className="mr-2 h-4 w-4" /> {action.buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
