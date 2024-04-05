import { Schema, model, models, Model } from 'mongoose';
import { EPostType } from '@/types/post-types';

/**
 * 1. kada se pravi post onda se zasebno pravi i Tag. Proveriti ako ne postoji napraviti.
 * 2. codeExample(snippet)
 *     - preview tab ---- treba da se uradi syntax highlighting (prism lib)
 * 3.  content -rich text editor  rich text editor --- tinymce lib.
 * 4.  Tags ---> treba da bude i select i input da moze da se unese nov tag ili izabere vec postojeci (react select lib);
 * 5.
 */

// ----------------------------------------------------------------

interface IPost {
  title: string;
  type: 'component' | 'knowledge' | 'workflow';
  tags: Schema.Types.ObjectId[];
  description: string;
  ownerId: Schema.Types.ObjectId;
  checklist?: string[];
  codeExample?: string;
  content?: string;
  learningResources?: {
    label: string;
    link: string;
  }[];
}

interface ILearningResourcesSchema {
  label: string;
  link: string;
}

const learningResourcesSchema = new Schema<ILearningResourcesSchema>({
  label: { type: String, required: true },
  link: { type: String, required: true },
});

const { COMPONENT, KNOWLEDGDE, WORKFLOW } = EPostType;

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  type: {
    type: String,
    enum: [COMPONENT, KNOWLEDGDE, WORKFLOW],
    required: true,
  },
  description: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  ownerId: { type: Schema.Types.ObjectId, required: true },
  checklist: [String],
  codeExample: String,
  content: String,
  learningResources: [learningResourcesSchema],
});

const Post: Model<IPost> = models?.Post || model<IPost>('Post', postSchema);

export default Post;

/** ************************************************ THIS IS LEFT FOR REFERENCE */
/**
 * User interface
 * 1. Posts Model
 *    --- Post moze da ima vise tagova
 *    --- post type
 * 2. Tag Model => user pravi nov post, dodaje bilo koj tag i posle se u right sidebaru prikazuju svi tagovi
 *    ---
 */

/**
 * 1. User ima []PostsID (objectID)
 * 2. Posts ima UserID (objectId)
 */

// model User {
//   id String
//   posts Post[]
//   tags Tag[]
// }

// model Post {
//   id String
//   title String
//   ownerId //REFERENCE TO USER
//   tags tagID[] (array referenci)
// }

// model Tag {
//   id String
//   title String
//   ownerId // REFERENCE TO USER
//   postId  objectId[] (array referenci)
// }

// kada radimo na ovaj nacin posts u useru se sam populatuje i ne storuju se zapravo u bazu nego samo dobijam kroz response

// model User {
//   id String
//   posts referce array
// }

// model Post {
//   id String
//   title String
//   owner User
// }

/**
 * model user line 90 ce
 */

// Homepage ima listu postova i ima listu tagova desno
// Svaki post ima svoje detalje i listu tagova

// Loadanje postova
// Post.find({ownerId: session.user.id}).populate('tags');
// [ {id: 1, title: 'My Post', tags: [ { id: 1, title: 'NextJS', ownerId: '3232' } ]} ]

// Tagovi sa strane (desno)
// Tag.find({ownerId: session.user.id});
