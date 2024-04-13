'use client';

import Image from 'next/image';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Button } from '../ui/button';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useToast } from '../ui/use-toast';

// ----------------------------------------------------------------

interface ISyntaxHighlightAndCopyProps {
  code: string;
}

const SyntaxHighlightAndCopy: React.FC<ISyntaxHighlightAndCopyProps> = ({
  code,
}) => {
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Copied to clipboard',
        description: 'dasdas',
        variant: 'success',
      });
    } catch (error) {
      console.log('Copy to clipboard failed!', error);
      toast({
        title: 'Failed to copy to clipboard',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={() => copyToClipboard(code)}
        className="absolute right-5 top-5 size-[16px] bg-transparent p-0"
      >
        <Image
          src="/assets/icons/icn-copy.svg"
          width={16}
          height={16}
          alt="Copy"
        />
      </Button>
      <SyntaxHighlighter
        customStyle={{ backgroundColor: '#131625' }}
        language="typescript"
        style={monokai}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default SyntaxHighlightAndCopy;
