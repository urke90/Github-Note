'use client';

import Image from 'next/image';
import parse, {
  HTMLReactParserOptions,
  Element,
  Text,
} from 'html-react-parser';
import { Button } from '../ui/button';
import TagItem from '../tag/TagItem';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ComponentMenu from '../shared/ComponentMenu';
import PostItemBadge from './PostItemBadge';
import { IPost } from '@/types/Post';

interface IPostDetailsProps {
  post: IPost;
}

const PostDetails: React.FC<IPostDetailsProps> = ({ post }) => {
  const { title, type, description, tags, codeExample, content, checklist } =
    post;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.log('Copy to clipboard failed!', error);
    }
  };

  const parserOptions: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.name === 'pre') {
        const codeTag = domNode.children.find(
          (node) => node instanceof Element && node.name === 'code'
        );

        if (codeTag) {
          const codeData = (
            (codeTag as Element).children.find(
              (node) => node instanceof Text && node.data
            ) as Text | undefined
          )?.data;

          if (!codeData) return domNode;

          return (
            <div className="relative">
              <Button
                onClick={() => copyToClipboard(codeData)}
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
                {codeData}
              </SyntaxHighlighter>
            </div>
          );
        }
      }
    },
  };

  return (
    <section className="mt-[30px]">
      <div className="flex flex-col gap-5 border-b border-b-[#55597D1A] px-[30px] pb-8">
        <div className="lg:flex-between  flex gap-2.5 max-lg:flex-col">
          <h1 className="h1-bold line-clamp-2">{title}</h1>
          <div className="flex-between lg:flex-center ">
            <PostItemBadge postType={type} />
            <ComponentMenu />
          </div>
        </div>
        <p className="p3-regular ">{description}</p>
        <div className="flex gap-3.5">
          <div className="flex-center gap-1">
            <Image
              src="/assets/icons/icn-calendar.svg"
              width={14}
              height={14}
              alt="calender"
            />
            <span className="p3-regular">14 Feb 2024</span>
          </div>
        </div>
        <ul className="flex gap-3">
          {tags.map(({ _id, title }) => (
            <TagItem key={_id} title={title} />
          ))}
        </ul>
      </div>
      <div className="flex flex-1 flex-col p-[30px]">
        {type === 'COMPONENT' && !!codeExample && (
          <SyntaxHighlighter
            customStyle={{ backgroundColor: '#131625' }}
            language="typescript"
            style={monokai}
          >
            {codeExample}
          </SyntaxHighlighter>
        )}
      </div>

      <div>
        {content && (
          <div className="bg-black prose prose-invert p-[30px]">
            {parse(content, parserOptions)}
          </div>
        )}
      </div>
    </section>
  );
};

export default PostDetails;
