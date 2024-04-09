import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RHFTextarea from '../RHFInputs/RHFTextarea';

type Props = {};

const CodeExampleTabs = (props: Props) => {
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
        <TabsTrigger value="preview" className="gap-2">
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
        <RHFTextarea name="codeExample" className="min-h-[200px]" />
      </TabsContent>
      <TabsContent value="preview">
        ADD PREVIEW FOR PASTER CODE EXAMPLE HERE
      </TabsContent>
    </Tabs>
  );
};

export default CodeExampleTabs;
