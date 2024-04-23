import CommentItem from './CommentItem';

export interface CommentListProps {
  list: {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    cardId: number;
    author: {
      profileImageUrl: string;
      nickname: string;
      id: number;
    };
  }[];
  edit: (content: string, id: number) => void;
  remove: (id: number) => void;
}

function CommentList({ list, edit, remove }: CommentListProps) {
  return (
    <>
      {list.map((comment) => (
        <CommentItem
          key={comment.id}
          id={comment.id}
          author={comment.author}
          content={comment.content}
          createdDate={comment.createdAt}
          updatedDate={comment.updatedAt}
          edit={edit}
          remove={remove}
        />
      ))}
    </>
  );
}
export default CommentList;
