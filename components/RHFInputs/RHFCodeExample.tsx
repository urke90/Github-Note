'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Editor } from '@tinymce/tinymce-react';
import { useFormContext } from 'react-hook-form';
import './RHFTextEditor.css';

// ----------------------------------------------------------------

interface IRHFCodeExampleProps {
  name: string;
  isEdit?: boolean;
  label?: string;
  description?: string;
}

const RHFCodeExample: React.FC<IRHFCodeExampleProps> = ({
  name,
  description,
  label,
  isEdit = true,
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Editor
              // onEditorChange={(value, editor) => {
              //   field.onChange(value);
              // }}
              onEditorChange={field.onChange}
              apiKey={process.env.NEXT_PUBLIC_TINY_MCE}
              init={{
                height: 216,
                menubar: false,
                statusbar: false,
                plugins: ['code', 'preview'],
                toolbar: isEdit ? 'code' : 'preview',
                content_style: 'body { font-size:14px; color: #ADB3CC; }',
              }}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RHFCodeExample;
