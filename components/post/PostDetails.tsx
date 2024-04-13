'use client';

import Image from 'next/image';
import parse, {
  HTMLReactParserOptions,
  Element,
  Text,
} from 'html-react-parser';
import TagItem from '../tag/TagItem';
import ComponentMenu from '../shared/ComponentMenu';
import PostItemBadge from './PostItemBadge';
import SyntaxHighlightAndCopy from '../shared/SyntaxHighlightAndCopy';
import ChecklistItem from '../shared/ChecklistItem';
import LearningResourceItem from '../shared/LearningResourceItem';
import type { IPost } from '@/types/Post';
import { EPostType } from '@/types/post-types';

// ----------------------------------------------------------------

interface IPostDetailsProps {
  post: IPost;
}

const parserOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    // if user adds code to the Rich Text Editor, format it with SyntaxHighlighter
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

        return <SyntaxHighlightAndCopy code={codeData} />;
      }
    }

    // This will add blue text color and text-underline to the 'a' tag
    // TODO: Check this with Mateo, since i am working with links which might be bolded/italic...etc
    if (domNode instanceof Element && domNode.name === 'a') {
      console.log('domNodeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', domNode);
      domNode.attribs.class = 'text-primary-500 underline';
      return domNode;
    }
  },
};

const PostDetails: React.FC<IPostDetailsProps> = ({ post }) => {
  const { COMPONENT, KNOWLEDGDE } = EPostType;
  const {
    title,
    type,
    description,
    tags,
    codeExample,
    content,
    checklist,
    learningResources,
  } = post;

  const checklistTitle =
    type === KNOWLEDGDE ? 'Key Takeaways' : 'Task Checklist';

  return (
    <section>
      <div className=" flex flex-col gap-5 border-b border-b-[#55597D1A] px-[30px] pb-8 pt-[30px]">
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
      <div className="flex flex-1 flex-col border-b border-b-[#55597D1A] px-[30px] pb-8 pt-[30px]">
        {type === COMPONENT && !!codeExample && (
          <SyntaxHighlightAndCopy code={codeExample} />
        )}
        {type !== COMPONENT && checklist?.length && (
          <>
            <p className="p1-bold mb-2.5 text-white-100">{checklistTitle}</p>
            <ul className="flex flex-col gap-2.5">
              {checklist.map((item) => (
                <ChecklistItem key={item} title={item} />
              ))}
            </ul>
          </>
        )}
      </div>
      {!!content && (
        <div className="prose prose-invert border-b border-b-[#55597D1A] px-[30px] pb-8 pt-[30px]">
          {parse(content, parserOptions)}
        </div>
      )}
      {learningResources && learningResources?.length > 0 && (
        <div className="px-[30px] pb-8 pt-[30px]">
          <p className="p2-bold mb-2 text-white-100">Resources & Links</p>
          <ul>
            {learningResources.map(({ label, link }) => (
              <LearningResourceItem key={label} label={label} link={link} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default PostDetails;