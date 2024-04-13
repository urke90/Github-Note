// import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
// import makeAnimated from 'react-select/animated';
import {
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from '../ui/form';

import { useFormContext } from 'react-hook-form';
import Image from 'next/image';

// ----------------------------------------------------------------

export interface ISelectOptions {
  label: string;
  value: string;
}

interface IRHFReactSelectProps {
  name: string;
  label?: string;
  description?: string;
  isMulti?: boolean;
  placeholder?: string;
  options: ISelectOptions[];
}

const DropdownIndicator = () => {
  return (
    <Image
      src="/assets/icons/icn-chevron-down.svg"
      width={16}
      height={16}
      alt="Chevron down"
    />
  );
};

// const animatedComponents = makeAnimated();

const RHFCreatableSelect: React.FC<IRHFReactSelectProps> = ({
  name,
  label,
  description,
  isMulti = true,
  placeholder,
  options,
}) => {
  const { control } = useFormContext();

  const blackPrimary = '#1D2032';
  const blackSecondary = '#2E3757';
  const whitePrimary = '#ADB3CC';

  // delimiter
  // inputValue

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <CreatableSelect
              {...field}
              noOptionsMessage={() => 'No tags available!'}
              onChange={(newValue) => {
                field.onChange(newValue);
              }}
              styles={{
                indicatorsContainer: (base) => ({
                  ...base,
                  color: whitePrimary,
                  marginRight: '12px',
                  cursor: 'pointer',
                }),
                clearIndicator: (base) => {
                  return {
                    ...base,
                    color: whitePrimary,
                  };
                },
                indicatorSeparator: () => ({
                  border: 'none',
                }),
                placeholder: (base) => ({
                  ...base,
                  color: whitePrimary,
                  fontSize: '14px',
                }),
                input: (base) => ({
                  ...base,
                  color: whitePrimary,
                }),
                control: () => ({
                  display: 'flex',
                  cursor: 'text',
                  paddingTop: '4px',
                  paddingBottom: '4px',
                  backgroundColor: blackPrimary,
                  '&:focus': {
                    border: 'none',
                    outline: 'none',
                  },
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: blackPrimary,
                  marginTop: 4,
                }),
                option: (base, { data, options }) => {
                  const isLastOption = data === options[options.length - 1];
                  return {
                    ...base,
                    backgroundColor: blackPrimary,
                    borderBottom: isLastOption
                      ? ''
                      : `1px solid ${blackPrimary}`,
                    '&:active': {
                      backgroundColor: blackSecondary,
                    },
                    '&:hover': {
                      backgroundColor: blackSecondary,
                    },
                  };
                },
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: blackSecondary,
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: whitePrimary,
                }),
                multiValueRemove: () => ({
                  paddingLeft: '4px',
                  paddingRight: '4px',
                }),
              }}
              options={options}
              placeholder={placeholder}
              components={{ DropdownIndicator }}
              isMulti={isMulti}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default RHFCreatableSelect;
