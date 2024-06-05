'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar, CalendarProps } from '@/components/ui/calendar';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

// ----------------------------------------------------------------

type IRHFDatePickerProps = CalendarProps & {
  name: string;
  label: string;
  buttonText?: string;
  description?: string;
  disableFromDate?: Date;
};

const RHFDatePicker: React.FC<IRHFDatePickerProps> = ({
  name,
  label = '',
  buttonText = 'Select date & time',
  description = '',
  disableFromDate = new Date(),
}) => {
  const { control } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col items-start">
          {label && <FormLabel className="p3-medium">{label}</FormLabel>}
          <Popover open={isOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  onClick={() => setIsOpen((prevOpen) => !prevOpen)}
                  variant="secondary"
                  className={cn(
                    'bg-black-700 justify-start',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="size-4 opacity-50" />
                  {field.value ? (
                    format(field.value, 'PPP')
                  ) : (
                    <p className="p3-regular">{buttonText}</p>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto bg-black-900 p-0" align="start">
              <Calendar
                mode="single"
                showOutsideDays={false}
                selected={field.value}
                onSelect={(day) => {
                  field.onChange(day);
                  setIsOpen(false);
                }}
                disabled={(date) => date < disableFromDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {description && (
            <FormDescription className="p4-regular">
              {description}
            </FormDescription>
          )}
          <FormMessage className="text-red-regular" />
        </FormItem>
      )}
    />
  );
};

export default RHFDatePicker;
