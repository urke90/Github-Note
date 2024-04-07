import Image from 'next/image';
import { X } from 'lucide-react';
import RHFInput from '../RHFInputs/RHFInput';
import { Button } from '../ui/button';
import { useFieldArray } from 'react-hook-form';

interface ILearningResourcesProps {}

const LearningResources: React.FC<ILearningResourcesProps> = (props) => {
  const { fields, append, remove } = useFieldArray({
    name: 'learningResources',
  });

  return (
    <div>
      <p className="mb-7 text-sm uppercase text-white-500">Resources & Links</p>
      <ul>
        {fields.length > 0 ? (
          fields.map((field, index) => (
            <li key={field.id} className="mb-3.5 flex items-center gap-2">
              <RHFInput
                name={`learningResources.${index}.label`}
                placeholder="Label"
              />
              <RHFInput
                name={`learningResources.${index}.link`}
                placeholder="Resource Link"
              />
              <div className="flex rounded bg-black-700 p-3.5">
                <X
                  className="size-4 cursor-pointer"
                  onClick={() => remove(index)}
                />
              </div>
            </li>
          ))
        ) : (
          <li className="mb-3.5 gap-2 text-center">
            Start adding new resources...
          </li>
        )}
      </ul>

      <Button
        type="button"
        variant="secondary"
        onClick={() => append({ label: '', link: '' })}
      >
        <Image
          src="/assets/icons/plus.svg"
          width={16}
          height={16}
          alt="New resource"
        />
        <span className="text-xs text-white-100">New Resource</span>
      </Button>
    </div>
  );
};

export default LearningResources;
