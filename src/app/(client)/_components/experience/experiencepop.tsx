import React, { JSX, useState } from "react";
import { cva } from "class-variance-authority";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function
const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// Button component
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
}>(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

// Card components
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-xl border bg-card text-card-foreground shadow", className)} {...props} />
  )
);
Card.displayName = "Card";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

// Textarea component
const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

// Main ReviewPage component
export const ReviewPage = (): JSX.Element => {
  const feedbackOptions = [
    { id: 1, label: "ambience", selected: true },
    { id: 2, label: "taste", selected: true },
    { id: 3, label: "service", selected: false },
    { id: 4, label: "music", selected: false },
    { id: 5, label: "quantity", selected: false },
    { id: 6, label: "presentation", selected: true },
  ];

  const [selectedOptions, setSelectedOptions] = useState(
    feedbackOptions.reduce(
      (acc, option) => {
        acc[option.id] = option.selected;
        return acc;
      },
      {} as Record<number, boolean>
    )
  );

  const toggleOption = (id: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="bg-[#0a1316] flex flex-row justify-center w-full min-h-screen">
      <Card className="bg-[#0a1316] w-[400px] relative border-none shadow-none">
        <CardContent className="p-6">
          <h2 className="font-black text-white text-xl mb-6 font-['Poppins',Helvetica]">
            What did you like?
          </h2>

          <div className="flex flex-wrap gap-2 mb-8">
            {feedbackOptions.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                className={`rounded-md px-2.5 py-2.5 h-auto ${
                  selectedOptions[option.id]
                    ? "bg-[#ffd700] border-[1.5px] border-white font-bold text-black"
                    : "bg-transparent border border-white text-white font-normal"
                }`}
                onClick={() => toggleOption(option.id)}
              >
                <span className="font-['Poppins',Helvetica] text-sm">
                  {option.label}
                </span>
              </Button>
            ))}
          </div>

          <h2 className="font-black text-white text-xl mb-4 font-['Poppins',Helvetica]">
            Comments
          </h2>

          <Textarea className="w-full h-[81px] bg-neutral-100 rounded-[5px] border border-solid border-white resize-none" />

          <div className="flex justify-end mt-6">
            <Button className="w-[97px] h-[31px] bg-white text-black hover:bg-white/90 rounded-[5px]">
              <span className="font-['Poppins',Helvetica] font-normal text-sm">
                submit
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};