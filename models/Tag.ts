import { Schema, model, models, Model } from 'mongoose';

// ----------------------------------------------------------------

interface ITag {
  title: string;
  ownerId: Schema.Types.ObjectId;
}

const tagSchema = new Schema<ITag>({
  title: { type: String, required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Tag: Model<ITag> = models?.Tag || model<ITag>('Tag', tagSchema);

export default Tag;
