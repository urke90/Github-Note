import { Schema, model, models, Model } from 'mongoose';

// ----------------------------------------------------------------

export interface ITag {
  title: string;
  ownerId: Schema.Types.ObjectId;
}

export interface ITagWithId extends ITag {
  _id: string;
}

const tagSchema = new Schema<ITag>({
  title: { type: String, required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const TagModel: Model<ITag> = models?.Tag || model<ITag>('Tag', tagSchema);

export default TagModel;
