'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Editor, type IAllProps } from '@tinymce/tinymce-react';
import { useFormContext } from 'react-hook-form';
// import Prism from 'prismjs';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/components/prism-css';
// import 'prismjs/components/prism-jsx';
import './RHFTextEditor.css';

// ----------------------------------------------------------------

interface IRHFCodeExampleProps extends IAllProps {
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
              //   initialValue={initialValue}
              onEditorChange={field.onChange}
              apiKey={process.env.NEXT_PUBLIC_TINY_MCE}
              init={{
                min_height: 216,
                menubar: false,
                statusbar: false,
                plugins: ['codesample', 'code'],
                toolbar: 'codesample code',
                // content_style: 'body { font-size:14px; color: #ADB3CC; }',
                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                codesample_global_prismjs: true,
                codesample_languages: [
                  { text: 'HTML/XML', value: 'markup' },
                  { text: 'JavaScript', value: 'javascript' },
                  { text: 'CSS', value: 'css' },
                  { text: 'PHP', value: 'php' },
                  { text: 'Ruby', value: 'ruby' },
                  { text: 'Python', value: 'python' },
                  { text: 'Java', value: 'java' },
                  { text: 'C', value: 'c' },
                  { text: 'C#', value: 'csharp' },
                  { text: 'C++', value: 'cpp' },
                ],
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
