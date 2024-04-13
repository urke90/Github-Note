import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RHFTextarea from '../RHFInputs/RHFTextarea';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import RHFCodeExample from '../RHFInputs/RHFCodeExample';
import { useFormContext } from 'react-hook-form';

type Props = {};

const CodeExampleTabs = (props: Props) => {
  const { getValues, trigger } = useFormContext();

  const code = getValues('codeExample');

  return (
    <Tabs defaultValue="code">
      <TabsList>
        <TabsTrigger value="code" className="gap-2">
          <Image
            src="/assets/icons/icn-code.svg"
            alt="Code"
            width={16}
            height={16}
          />
          Code
        </TabsTrigger>
        <TabsTrigger
          value="preview"
          className="gap-2"
          onClick={() => trigger('codeExample')}
        >
          <Image
            src="/assets/icons/icn-eye.svg"
            alt="Eye"
            width={16}
            height={16}
          />
          Preview
        </TabsTrigger>
      </TabsList>
      <TabsContent value="code">
        {/* <RHFTextarea name="codeExample" className="min-h-[200px]" /> */}
        <RHFTextarea name="codeExample" />
      </TabsContent>
      <TabsContent value="preview">
        <SyntaxHighlighter language="javascript" style={monokai}>
          {code}
        </SyntaxHighlighter>
      </TabsContent>
    </Tabs>
  );
};

export default CodeExampleTabs;
