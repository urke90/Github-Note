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

interface ITextEditorProps {
  name: string;
  label?: string;
  description?: string;
}

const RHFTextEditor: React.FC<ITextEditorProps> = ({
  name,
  description,
  label,
}) => {
  const { control } = useFormContext();

  return (
    <>
      <p className="mb-7 text-sm uppercase text-white-500">Content</p>

      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Editor
                onEditorChange={(_, editor) => {
                  const content = editor.getContent({ format: 'text' });

                  field.onChange(content);
                }}
                apiKey={process.env.NEXT_PUBLIC_TINY_MCE}
                init={{
                  height: 216,
                  menubar: false,
                  statusbar: false,
                  plugins: ['lists', 'link', 'image'],
                  toolbar: 'bold italic blockquote link image numlist bullist',
                  content_style: 'body { font-size:14px; color: #ADB3CC; }',
                }}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default RHFTextEditor;
