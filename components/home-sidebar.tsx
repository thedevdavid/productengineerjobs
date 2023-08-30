import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type CardProps = React.ComponentProps<typeof Card>;

export function Sidebar({ className, ...props }: CardProps) {
  return (
    <>
      <Card className={cn("mb-4 rounded-md shadow-sm", className)} {...props}>
        <CardHeader>
          <CardTitle>Get notified about new jobs</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <Button disabled type="submit" variant="secondary" className="w-full">
            Notify me
          </Button>
        </CardContent>
        <Separator />
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Sending weekly email about new jobs. You can unsubscribe at any time.
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
