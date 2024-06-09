'use client';

import RHFCheckbox from '../RHFInputs/RHFCheckbox';
import RHFDatePicker from '../RHFInputs/RHFDatePicker';
import { Button } from '../ui/button';

import { useFormContext, useWatch } from 'react-hook-form';

// ----------------------------------------------------------------

const ScheduleAndAvailability: React.FC = () => {
  const { getValues } = useFormContext();
  useWatch({ name: 'startDate' });
  const startDate = getValues('startDate');

  return (
    <section>
      <RHFCheckbox
        name="isAvailable"
        label="Are you available for a new project?"
      />
      <div className="mb-6 mt-8 flex flex-wrap gap-6">
        <div className="flex-1">
          <RHFDatePicker
            name="startDate"
            label="Start Date & Time"
            description="The time is in your local timezone"
          />
        </div>
        <div className="flex-1">
          <RHFDatePicker
            name="endDate"
            label="End Date & Time"
            description="The time is in your local timezone"
            disableFromDate={startDate}
          />
        </div>
      </div>
      <Button type="submit">Submit</Button>
    </section>
  );
};

export default ScheduleAndAvailability;
