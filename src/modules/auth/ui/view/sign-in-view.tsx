import { Card, CardContent } from "@/components/ui/card";

export const SignInView = () => {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid gap-6 p-0 md:grid-cols-2 md:p-10">
          <div>col 1</div>
          <div>col2</div>{" "}
        </CardContent>
      </Card>
    </div>
  );
};
